// Native validation harness for mesher.cpp (not part of the wasm build).
// Build: clang++ -O2 -std=c++17 nativeTest.cpp mesher.cpp predicates.c -o mesherTest
#include <cmath>
#include <cstdio>
#include <cstdlib>
#include <map>
#include <string>
#include <utility>
#include <vector>

extern "C" {
int mesh_polygon(const double* xy, int nPoints, double maxArea,
                 double minAngleDeg, int maxSteiner);
int mesh_num_points();
int mesh_num_triangles();
const double* mesh_points();
const int* mesh_triangles();
}

namespace {

int failures = 0;

void check(bool ok, const char* what, const char* fixture) {
  if (!ok) {
    printf("FAIL [%s]: %s\n", fixture, what);
    failures++;
  }
}

struct Stats {
  int nPts = 0, nTris = 0;
  double minAngle = 1e9, maxArea = 0, sumArea = 0;
};

double polyArea(const std::vector<double>& poly) {
  double s = 0;
  int n = (int)poly.size() / 2;
  for (int i = 0; i < n; i++) {
    int j = (i + 1) % n;
    s += poly[2 * i] * poly[2 * j + 1] - poly[2 * j] * poly[2 * i + 1];
  }
  return 0.5 * std::fabs(s);
}

double minCornerAngle(const std::vector<double>& poly) {
  int n = (int)poly.size() / 2;
  double best = 1e9;
  for (int i = 0; i < n; i++) {
    int p = (i + n - 1) % n, q = (i + 1) % n;
    double ux = poly[2 * p] - poly[2 * i], uy = poly[2 * p + 1] - poly[2 * i + 1];
    double vx = poly[2 * q] - poly[2 * i], vy = poly[2 * q + 1] - poly[2 * i + 1];
    double c = (ux * vx + uy * vy) / (std::hypot(ux, uy) * std::hypot(vx, vy));
    c = std::max(-1.0, std::min(1.0, c));
    best = std::min(best, std::acos(c) * 180.0 / M_PI);
  }
  return best;
}

double pointSegDist(double px, double py, double ax, double ay, double bx,
                    double by) {
  double vx = bx - ax, vy = by - ay;
  double L2 = vx * vx + vy * vy;
  double t = L2 > 0 ? ((px - ax) * vx + (py - ay) * vy) / L2 : 0;
  t = std::max(0.0, std::min(1.0, t));
  double dx = px - (ax + t * vx), dy = py - (ay + t * vy);
  return std::hypot(dx, dy);
}

// Full validity check of the output mesh against the input polygon.
Stats validate(const char* name, const std::vector<double>& poly,
               double maxArea, double minAngleAssert) {
  Stats st;
  int n = (int)poly.size() / 2;
  st.nPts = mesh_num_points();
  st.nTris = mesh_num_triangles();
  const double* P = mesh_points();
  const int* T = mesh_triangles();

  check(st.nPts >= n, "output has at least the input corners", name);
  check(st.nTris > 0, "output has triangles", name);

  // corner preservation, bit-exact
  bool corners = true;
  for (int i = 0; i < n; i++)
    if (P[2 * i] != poly[2 * i] || P[2 * i + 1] != poly[2 * i + 1])
      corners = false;
  check(corners, "corners preserved bit-exact as nodes 0..n-1", name);

  // no duplicate points
  {
    std::map<std::pair<double, double>, int> seen;
    bool dup = false;
    for (int i = 0; i < st.nPts; i++)
      if (!seen.emplace(std::make_pair(P[2 * i], P[2 * i + 1]), i).second)
        dup = true;
    check(!dup, "no duplicate output points", name);
  }

  double diag = 0;
  for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)
      diag = std::max(diag, std::hypot(poly[2 * i] - poly[2 * j],
                                       poly[2 * i + 1] - poly[2 * j + 1]));

  std::map<std::pair<int, int>, int> edgeCount;
  bool ccw = true, idxOk = true;
  for (int k = 0; k < st.nTris; k++) {
    int a = T[3 * k], b = T[3 * k + 1], c = T[3 * k + 2];
    if (a < 0 || b < 0 || c < 0 || a >= st.nPts || b >= st.nPts ||
        c >= st.nPts || a == b || b == c || a == c)
      idxOk = false;
    double area = 0.5 * ((P[2 * b] - P[2 * a]) * (P[2 * c + 1] - P[2 * a + 1]) -
                         (P[2 * c] - P[2 * a]) * (P[2 * b + 1] - P[2 * a + 1]));
    if (area <= 0) ccw = false;
    st.sumArea += area;
    st.maxArea = std::max(st.maxArea, area);
    int vs[3] = {a, b, c};
    for (int m = 0; m < 3; m++) {
      int u = vs[m], w = vs[(m + 1) % 3];
      edgeCount[{std::min(u, w), std::max(u, w)}]++;
      int o = vs[(m + 2) % 3];
      double ux = P[2 * u] - P[2 * o], uy = P[2 * u + 1] - P[2 * o + 1];
      double wx = P[2 * w] - P[2 * o], wy = P[2 * w + 1] - P[2 * o + 1];
      double cang = (ux * wx + uy * wy) /
                    (std::hypot(ux, uy) * std::hypot(wx, wy));
      cang = std::max(-1.0, std::min(1.0, cang));
      st.minAngle = std::min(st.minAngle, std::acos(cang) * 180.0 / M_PI);
    }
  }
  check(idxOk, "triangle indices valid", name);
  check(ccw, "all triangles CCW with positive area", name);

  double pa = polyArea(poly);
  check(std::fabs(st.sumArea - pa) <= 1e-9 * pa + 1e-12,
        "triangle areas sum to the polygon area", name);

  // conformity: every once-used edge lies on an input segment; edges are
  // used at most twice; input segments are fully covered
  bool manifold = true, onBoundary = true;
  std::vector<double> segCover(n, 0);
  for (auto& [e, cnt] : edgeCount) {
    if (cnt > 2) manifold = false;
    if (cnt != 1) continue;
    double ux = P[2 * e.first], uy = P[2 * e.first + 1];
    double wx = P[2 * e.second], wy = P[2 * e.second + 1];
    bool found = false;
    for (int s = 0; s < n; s++) {
      int q = (s + 1) % n;
      double ax = poly[2 * s], ay = poly[2 * s + 1];
      double bx = poly[2 * q], by = poly[2 * q + 1];
      if (pointSegDist(ux, uy, ax, ay, bx, by) < 1e-9 * diag &&
          pointSegDist(wx, wy, ax, ay, bx, by) < 1e-9 * diag) {
        segCover[s] += std::hypot(ux - wx, uy - wy);
        found = true;
        break;
      }
    }
    if (!found) onBoundary = false;
  }
  check(manifold, "every edge used at most twice", name);
  check(onBoundary, "every boundary edge lies on an input segment", name);
  bool covered = true;
  for (int s = 0; s < n; s++) {
    int q = (s + 1) % n;
    double len = std::hypot(poly[2 * s] - poly[2 * q], poly[2 * s + 1] - poly[2 * q + 1]);
    if (std::fabs(segCover[s] - len) > 1e-6 * len) covered = false;
  }
  check(covered, "every input segment fully covered by boundary edges", name);

  if (maxArea > 0)
    check(st.maxArea <= maxArea * (1 + 1e-9),
          "max triangle area within the constraint", name);
  if (minAngleAssert > 0)
    check(st.minAngle >= minAngleAssert - 0.5,
          "min angle meets the quality bound", name);
  return st;
}

void runCase(const char* name, const std::vector<double>& poly, double maxArea,
             bool assertQuality, bool print) {
  int code = mesh_polygon(poly.data(), (int)poly.size() / 2, maxArea, 28, 10000);
  char buf[128];
  snprintf(buf, sizeof buf, "mesh_polygon returned %d", code);
  check(code == 0, buf, name);
  if (code != 0) return;
  double bound = 0;
  if (assertQuality && minCornerAngle(poly) >= 60) bound = 28;
  Stats st = validate(name, poly, maxArea, bound);
  if (print)
    printf("%-24s nPts=%4d nTris=%4d minAngle=%6.2f maxArea=%8.5f sumArea=%9.5f\n",
           name, st.nPts, st.nTris, st.minAngle, st.maxArea, st.sumArea);
}

uint32_t rngState = 12345;
double frand() {
  rngState ^= rngState << 13;
  rngState ^= rngState >> 17;
  rngState ^= rngState << 5;
  return (rngState >> 8) / double(1 << 24);
}

}  // namespace

int main() {
  // ---- fixtures (baseline stats from triangle-wasm in comments) ----
  runCase("unit-square-a0.1",  // baseline: 13 pts / 16 tris
          {0, 0, 1, 0, 1, 1, 0, 1}, 0.1, true, true);
  runCase("unit-square-a1",  // baseline: 4 pts / 2 tris
          {0, 0, 1, 0, 1, 1, 0, 1}, 1, true, true);
  runCase("rect-10x1-a0.5",  // baseline: 32 pts / 35 tris
          {0, 0, 10, 0, 10, 1, 0, 1}, 0.5, true, true);
  runCase("l-shape-a0.2",  // baseline: 19 pts / 21 tris
          {0, 0, 2, 0, 2, 1, 1, 1, 1, 2, 0, 2}, 0.2, true, true);
  runCase("plate-5x5-a0.5",  // baseline: 51 pts / 77 tris
          {0, 0, 5, 0, 5, 5, 0, 5}, 0.5, true, true);
  {
    double t = std::tan(10 * M_PI / 180);
    runCase("sliver-10deg-a0.5",  // baseline: 10 pts / 8 tris
            {0, 0, 5, 0, 5, 5 * t}, 0.5, false, true);
  }
  runCase("no-area-constraint", {0, 0, 1, 0, 1, 1, 0, 1}, 0, true, true);
  runCase("collinear-boundary-pts",  // extra vertex mid-edge
          {0, 0, 1, 0, 2, 0, 2, 2, 0, 2}, 0.3, true, true);
  runCase("cw-ring", {0, 0, 0, 1, 1, 1, 1, 0}, 0.2, true, true);
  runCase("thin-3deg",
          {0, 0, 10, 0, 10, 10 * std::tan(3 * M_PI / 180)}, 1, false, true);
  runCase("dense-a0.001", {0, 0, 1, 0, 1, 1, 0, 1}, 0.001, true, true);
  runCase("star-notch",  // non-convex with reflex corners
          {0, 0, 4, 0, 4, 4, 2, 4, 2, 2, 1, 2, 1, 4, 0, 4}, 0.15, true, true);

  // ---- error handling ----
  {
    std::vector<double> two = {0, 0, 1, 0};
    check(mesh_polygon(two.data(), 2, 1, 28, 1000) == 1, "n<3 rejected", "errors");
    std::vector<double> dup = {0, 0, 1, 0, 1, 0, 0, 1};
    check(mesh_polygon(dup.data(), 4, 1, 28, 1000) != 0, "duplicate corner rejected", "errors");
    std::vector<double> col = {0, 0, 1, 0, 2, 0};
    check(mesh_polygon(col.data(), 3, 1, 28, 1000) != 0, "collinear polygon rejected", "errors");
  }

  // ---- fuzz: random convex and star polygons ----
  int fuzzFail0 = failures;
  int fuzzIters = 300;
  if (const char* env = getenv("MESHER_FUZZ_ITERS")) fuzzIters = atoi(env);
  for (int it = 0; it < fuzzIters; it++) {
    int kind = it % 3;
    std::vector<double> poly;
    if (kind == 0) {
      // star-shaped about the origin: jittered regular angles (every gap
      // stays well under 180 degrees, so the polygon is always simple),
      // random radii
      int n = 5 + (int)(frand() * 25);
      for (int i = 0; i < n; i++) {
        double a = 2 * M_PI * (i + 0.8 * frand()) / n;
        double r = 0.3 + 0.7 * frand();
        poly.push_back(10 * r * std::cos(a));
        poly.push_back(10 * r * std::sin(a));
      }
    } else if (kind == 1) {
      // regular-ish convex polygon, jittered radius
      int n = 3 + (int)(frand() * 12);
      for (int i = 0; i < n; i++) {
        double a = 2 * M_PI * i / n;
        double r = 5 * (0.9 + 0.2 * frand());
        poly.push_back(r * std::cos(a));
        poly.push_back(r * std::sin(a));
      }
    } else {
      // thin rectangle strip
      double L = 1 + frand() * 20, H = 0.05 + frand();
      poly = {0, 0, L, 0, L, H, 0, H};
    }
    double pa = polyArea(poly);
    if (pa < 1e-6) continue;
    double maxA = pa * std::pow(10.0, -2.5 * frand());
    char name[64];
    snprintf(name, sizeof name, "fuzz-%03d", it);
    int code = mesh_polygon(poly.data(), (int)poly.size() / 2, maxA, 28, 10000);
    char buf[128];
    snprintf(buf, sizeof buf, "mesh_polygon returned %d", code);
    check(code == 0, buf, name);
    if (code != 0 && getenv("MESHER_DUMP")) {
      printf("  poly (%d pts, maxA=%.9g): {", (int)poly.size() / 2, maxA);
      for (double v : poly) printf("%.17g,", v);
      printf("}\n");
    }
    if (code == 0) validate(name, poly, maxA, 0);
    if (failures > fuzzFail0 + 20) {
      printf("too many fuzz failures, stopping early\n");
      break;
    }
  }

  printf(failures ? "\n%d FAILURES\n" : "\nALL PASS\n", failures);
  return failures ? 1 : 0;
}
