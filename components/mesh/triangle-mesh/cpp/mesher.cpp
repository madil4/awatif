// In-house 2D quality mesher for a single closed planar polygon (no holes).
//
// Pipeline: incremental Delaunay of the polygon corners inside a super
// triangle (locate + split + Lawson legalization), flip-based recovery of the
// boundary segments (constrained Delaunay), flood-fill removal of the
// exterior, then Ruppert-style refinement: encroached-subsegment splitting
// (concentric shells at corners) and circumcenter insertion driven by a
// minimum-angle bound and a maximum-area constraint, with a hard Steiner cap
// so meshing always terminates with a valid conforming mesh.
//
// Contract required by the TS wrapper (see triangleMesh.ts / getMesh.ts):
// input corner i comes out as output node i with bit-identical coordinates.
//
// All topological decisions go through the exact predicates in predicates.c;
// only Steiner point coordinates are computed in plain floating point.

#include <algorithm>
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <deque>
#include <vector>

#include "predicates.h"

namespace {

struct Tri {
  int v[3];   // vertices, CCW; edge i is (v[(i+1)%3], v[(i+2)%3]), opposite v[i]
  int n[3];   // neighbor across edge i, -1 = none
  bool c[3];  // edge i lies on a boundary segment
  bool alive;
};

struct Seg {
  int u, w;   // endpoints (triangulation vertex indices)
  int id;     // input polygon segment (corner id -> corner (id+1)%n)
  bool alive;
  bool frozen;  // too short to split further
};

// Error codes returned by mesh_polygon
enum {
  MESH_OK = 0,
  MESH_TOO_FEW_POINTS = 1,
  MESH_DUPLICATE_POINTS = 2,
  MESH_DEGENERATE = 3,
  MESH_RECOVERY_FAILED = 4,
  MESH_INTERNAL = 5,
};

struct Mesher {
  std::vector<double> pts;  // x,y pairs
  std::vector<Tri> tris;
  std::vector<Seg> segs;
  std::vector<int> vertSeg;  // -1 corner, >=0 on-segment Steiner, -2 free
  std::vector<bool> acute;   // per input corner: wedge angle < 60 degrees
  int nIn = 0;               // number of input corners
  int super0 = 0;            // first super-triangle vertex index
  int steiner = 0;
  int maxSteiner = 0;
  double maxArea = 0;   // <= 0 disables the area constraint
  double ratio2Max = 0; // <= 0 disables the quality constraint
  double minSegLen2 = 0;
  uint32_t rng = 0x9e3779b9u;

  double* P(int i) { return &pts[2 * i]; }
  double orient(int a, int b, int c) { return orient2d(P(a), P(b), P(c)); }

  uint32_t rand32() {
    rng ^= rng << 13;
    rng ^= rng >> 17;
    rng ^= rng << 5;
    return rng;
  }

  int addPoint(double x, double y, int segTag) {
    pts.push_back(x);
    pts.push_back(y);
    vertSeg.push_back(segTag);
    return (int)pts.size() / 2 - 1;
  }

  int addTri(int a, int b, int c) {
    Tri t;
    t.v[0] = a; t.v[1] = b; t.v[2] = c;
    t.n[0] = t.n[1] = t.n[2] = -1;
    t.c[0] = t.c[1] = t.c[2] = false;
    t.alive = true;
    tris.push_back(t);
    return (int)tris.size() - 1;
  }

  void kill(int t) { tris[t].alive = false; }

  int edgeIndexOf(int t, int u, int w) {
    for (int i = 0; i < 3; i++) {
      int a = tris[t].v[(i + 1) % 3], b = tris[t].v[(i + 2) % 3];
      if ((a == u && b == w) || (a == w && b == u)) return i;
    }
    return -1;
  }

  int idxOfNeighbor(int t, int nb) {
    for (int i = 0; i < 3; i++)
      if (tris[t].n[i] == nb) return i;
    return -1;
  }

  // Attach outer edge (u,w) of newTri (at newEdge) to former neighbor `nb`
  // with constrained flag `cflag`, fixing nb's back pointer.
  void rebind(int newTri, int newEdge, int nb, bool cflag, int u, int w) {
    tris[newTri].n[newEdge] = nb;
    tris[newTri].c[newEdge] = cflag;
    if (nb >= 0) {
      int j = edgeIndexOf(nb, u, w);
      if (j >= 0) tris[nb].n[j] = newTri;
    }
  }

  // ---- point location -------------------------------------------------
  // Returns triangle containing (x,y). onEdge: -1 strictly inside, 0..2 on
  // that edge. Returns -3 if the point coincides with a vertex, -2 if the
  // walk hits a constrained edge or the hull (crossT/crossE set), -4 on
  // walk failure.
  int locate(double x, double y, int start, int& onEdge, int& crossT,
             int& crossE) {
    double p[2] = {x, y};
    int t = start;
    if (t < 0 || !tris[t].alive) {
      t = -1;
      for (int i = (int)tris.size() - 1; i >= 0; i--)
        if (tris[i].alive) { t = i; break; }
      if (t < 0) return -4;
    }
    long cap = 4 * (long)tris.size() + 32;
    while (cap-- > 0) {
      int neg[3], nn = 0, zero[3], nz = 0;
      for (int i = 0; i < 3; i++) {
        int a = tris[t].v[(i + 1) % 3], b = tris[t].v[(i + 2) % 3];
        double o = orient2d(P(a), P(b), p);
        if (o < 0) neg[nn++] = i;
        else if (o == 0) zero[nz++] = i;
      }
      if (nn == 0) {
        if (nz == 0) { onEdge = -1; return t; }
        if (nz == 1) { onEdge = zero[0]; return t; }
        return -3;  // on a vertex
      }
      int i = neg[nn == 1 ? 0 : (int)(rand32() % nn)];
      int nb = tris[t].n[i];
      if (nb < 0 || tris[t].c[i]) { crossT = t; crossE = i; return -2; }
      t = nb;
    }
    return -4;
  }

  // ---- flips and legalization -----------------------------------------
  // Flip the edge i of t (must have an unconstrained neighbor). Appends two
  // new triangles (p,u,d) and (p,d,w); returns their indices.
  bool flipEdge(int t, int i, int& outX, int& outY) {
    int nb = tris[t].n[i];
    int j = idxOfNeighbor(nb, t);
    Tri T = tris[t], N = tris[nb];
    int p = T.v[i], u = T.v[(i + 1) % 3], w = T.v[(i + 2) % 3];
    int d = N.v[j];
    // safety: the new triangles must be strictly CCW
    if (orient(p, u, d) <= 0 || orient(p, d, w) <= 0) return false;
    int n_wp = T.n[(i + 1) % 3]; bool c_wp = T.c[(i + 1) % 3];
    int n_pu = T.n[(i + 2) % 3]; bool c_pu = T.c[(i + 2) % 3];
    int n_ud = N.n[(j + 1) % 3]; bool c_ud = N.c[(j + 1) % 3];
    int n_dw = N.n[(j + 2) % 3]; bool c_dw = N.c[(j + 2) % 3];
    kill(t);
    kill(nb);
    int X = addTri(p, u, d);  // edges: 0 (u,d), 1 (d,p) shared, 2 (p,u)
    int Y = addTri(p, d, w);  // edges: 0 (d,w), 1 (w,p), 2 (p,d) shared
    rebind(X, 0, n_ud, c_ud, u, d);
    rebind(X, 2, n_pu, c_pu, p, u);
    rebind(Y, 0, n_dw, c_dw, d, w);
    rebind(Y, 1, n_wp, c_wp, w, p);
    tris[X].n[1] = Y;
    tris[Y].n[2] = X;
    outX = X;
    outY = Y;
    return true;
  }

  // Lawson legalization: edge i of t is opposite the newly inserted vertex.
  void legalize(int t, int i, int depth = 0) {
    if (depth > 512) return;
    if (!tris[t].alive) return;
    if (tris[t].c[i] || tris[t].n[i] < 0) return;
    int nb = tris[t].n[i];
    int j = idxOfNeighbor(nb, t);
    int d = tris[nb].v[j];
    if (incircle(P(tris[t].v[0]), P(tris[t].v[1]), P(tris[t].v[2]), P(d)) <= 0)
      return;
    int X, Y;
    if (!flipEdge(t, i, X, Y)) return;
    legalize(X, 0, depth + 1);
    legalize(Y, 0, depth + 1);
  }

  // ---- insertion -------------------------------------------------------
  // 1 -> 3 split of triangle t by vertex vi strictly inside it.
  void insertInterior(int vi, int t) {
    Tri T = tris[t];
    kill(t);
    int t0 = addTri(vi, T.v[1], T.v[2]);
    int t1 = addTri(vi, T.v[2], T.v[0]);
    int t2 = addTri(vi, T.v[0], T.v[1]);
    rebind(t0, 0, T.n[0], T.c[0], T.v[1], T.v[2]);
    rebind(t1, 0, T.n[1], T.c[1], T.v[2], T.v[0]);
    rebind(t2, 0, T.n[2], T.c[2], T.v[0], T.v[1]);
    tris[t0].n[1] = t1; tris[t1].n[2] = t0;
    tris[t1].n[1] = t2; tris[t2].n[2] = t1;
    tris[t2].n[1] = t0; tris[t0].n[2] = t2;
    legalize(t0, 0);
    legalize(t1, 0);
    legalize(t2, 0);
  }

  // Split edge e of t by vertex vi lying on it. Handles boundary edges
  // (no neighbor) and propagates the constrained flag to both halves.
  // segId >= 0 updates the subsegment bookkeeping (constrained edges only).
  void insertOnEdge(int vi, int t, int e, int segIdx) {
    Tri T = tris[t];
    int a = T.v[e], u = T.v[(e + 1) % 3], w = T.v[(e + 2) % 3];
    bool cons = T.c[e];
    int t2 = T.n[e];
    int n_wa = T.n[(e + 1) % 3]; bool c_wa = T.c[(e + 1) % 3];
    int n_au = T.n[(e + 2) % 3]; bool c_au = T.c[(e + 2) % 3];
    kill(t);
    int T1 = addTri(a, u, vi);  // edges: 0 (u,vi), 1 (vi,a), 2 (a,u)
    int T2 = addTri(a, vi, w);  // edges: 0 (vi,w), 1 (w,a), 2 (a,vi)
    rebind(T1, 2, n_au, c_au, a, u);
    rebind(T2, 1, n_wa, c_wa, w, a);
    tris[T1].c[0] = cons;
    tris[T2].c[0] = cons;
    tris[T1].n[1] = T2;
    tris[T2].n[2] = T1;
    int T3 = -1, T4 = -1;
    if (t2 >= 0) {
      Tri N = tris[t2];
      int j = idxOfNeighbor(t2, t);
      int d = N.v[j];  // N cyclic (d, w, u)
      int n_ud = N.n[(j + 1) % 3]; bool c_ud = N.c[(j + 1) % 3];
      int n_dw = N.n[(j + 2) % 3]; bool c_dw = N.c[(j + 2) % 3];
      kill(t2);
      T3 = addTri(d, w, vi);  // edges: 0 (w,vi), 1 (vi,d), 2 (d,w)
      T4 = addTri(d, vi, u);  // edges: 0 (vi,u), 1 (u,d), 2 (d,vi)
      rebind(T3, 2, n_dw, c_dw, d, w);
      rebind(T4, 1, n_ud, c_ud, u, d);
      tris[T3].c[0] = cons;
      tris[T4].c[0] = cons;
      tris[T3].n[1] = T4;
      tris[T4].n[2] = T3;
      tris[T3].n[0] = T2; tris[T2].n[0] = T3;
      tris[T4].n[0] = T1; tris[T1].n[0] = T4;
    } else {
      tris[T1].n[0] = -1;
      tris[T2].n[0] = -1;
    }
    if (cons && segIdx >= 0) {
      int id = segs[segIdx].id;
      segs[segIdx].alive = false;
      segs.push_back({u, vi, id, true, false});
      segs.push_back({vi, w, id, true, false});
      vertSeg[vi] = id;
    }
    legalize(T1, 2);
    legalize(T2, 1);
    if (T3 >= 0) {
      legalize(T3, 2);
      legalize(T4, 1);
    }
  }

  // ---- constraint recovery ---------------------------------------------
  bool edgeExists(int u, int w, int& t, int& i) {
    for (int k = 0; k < (int)tris.size(); k++) {
      if (!tris[k].alive) continue;
      int e = edgeIndexOf(k, u, w);
      if (e >= 0) { t = k; i = e; return true; }
    }
    return false;
  }

  void markConstrained(int u, int w, int id) {
    int t, i;
    if (!edgeExists(u, w, t, i)) return;
    tris[t].c[i] = true;
    int nb = tris[t].n[i];
    if (nb >= 0) {
      int j = idxOfNeighbor(nb, t);
      tris[nb].c[j] = true;
    }
    segs.push_back({u, w, id, true, false});
  }

  bool between(int a, int b, int v) {
    double ax = pts[2 * a], ay = pts[2 * a + 1];
    double bx = pts[2 * b], by = pts[2 * b + 1];
    double vx = pts[2 * v], vy = pts[2 * v + 1];
    if (ax != bx)
      return (ax < vx && vx < bx) || (bx < vx && vx < ax);
    return (ay < vy && vy < by) || (by < vy && vy < ay);
  }

  bool recoverSegment(int a, int b, int id, int depth = 0) {
    if (a == b || depth > 64) return false;
    int t, i;
    if (edgeExists(a, b, t, i)) {
      markConstrained(a, b, id);
      return true;
    }
    // a vertex lying exactly on the segment splits the recovery in two
    int nV = (int)pts.size() / 2;
    int best = -1;
    double bestD = 0;
    for (int v = 0; v < nV; v++) {
      if (v == a || v == b || v >= super0) continue;
      if (orient(a, b, v) == 0 && between(a, b, v)) {
        double dx = pts[2 * v] - pts[2 * a], dy = pts[2 * v + 1] - pts[2 * a + 1];
        double d = dx * dx + dy * dy;
        if (best < 0 || d < bestD) { best = v; bestD = d; }
      }
    }
    if (best >= 0)
      return recoverSegment(a, best, id, depth + 1) &&
             recoverSegment(best, b, id, depth + 1);

    // flip away the edges crossing (a,b)
    for (int guard = 0; guard < 20000; guard++) {
      if (edgeExists(a, b, t, i)) {
        markConstrained(a, b, id);
        return true;
      }
      // march from a to b collecting crossing edges
      std::vector<std::pair<int, int>> cross;  // vertex pairs (u,w)
      int cur = -1, ce = -1;
      for (int k = 0; k < (int)tris.size() && cur < 0; k++) {
        if (!tris[k].alive) continue;
        for (int m = 0; m < 3; m++) {
          if (tris[k].v[m] != a) continue;
          int u = tris[k].v[(m + 1) % 3], w = tris[k].v[(m + 2) % 3];
          // The ray a->b lies inside the wedge (u first, w second, CCW)
          // iff u is right of the line a->b and w is left of it; b beyond
          // the opposite edge rules out the wedge on the far side of a.
          // Invariant kept by the march: A(ce) right, B(ce) left.
          if (orient(a, b, u) < 0 && orient(a, b, w) > 0 &&
              orient(u, w, b) < 0) {
            cur = k;
            ce = m;
          }
          break;
        }
      }
      if (cur < 0) {
#ifdef MESHER_DEBUG
        fprintf(stderr, "recover(%d,%d): no starting wedge\n", a, b);
#endif
        return false;
      }
      while (true) {
        int u = tris[cur].v[(ce + 1) % 3], w = tris[cur].v[(ce + 2) % 3];
        if (tris[cur].c[ce]) {
#ifdef MESHER_DEBUG
          fprintf(stderr, "recover(%d,%d): hit constrained edge\n", a, b);
#endif
          return false;
        }
        cross.push_back({u, w});
        int nb = tris[cur].n[ce];
        if (nb < 0) {
#ifdef MESHER_DEBUG
          fprintf(stderr, "recover(%d,%d): march hit hull\n", a, b);
#endif
          return false;
        }
        int j = idxOfNeighbor(nb, cur);
        int d = tris[nb].v[j];
        if (d == b) break;
        double od = orient(a, b, d);
        if (od == 0) {
#ifdef MESHER_DEBUG
          fprintf(stderr, "recover(%d,%d): collinear vertex %d mid-march\n", a, b, d);
#endif
          return false;
        }
        // The segment continues through one of nb's other two edges. With
        // the invariant A(ce)=u right, B(ce)=w left, nb is cyclic (d, w, u):
        // d left (od > 0) -> next crossing edge is (u, d) = index (j+1),
        // keeping A=u right, B=d left; d right (od < 0) -> (d, w) = (j+2),
        // A=d right, B=w left.
        cur = nb;
        ce = (od > 0) ? (j + 1) % 3 : (j + 2) % 3;
        if (cross.size() > tris.size() + 8) {
#ifdef MESHER_DEBUG
          fprintf(stderr, "recover(%d,%d): march runaway\n", a, b);
#endif
          return false;
        }
      }
      // flip the first flippable crossing edge
      bool flipped = false;
      for (auto& euw : cross) {
        int ft, fe;
        if (!edgeExists(euw.first, euw.second, ft, fe)) continue;
        if (tris[ft].c[fe] || tris[ft].n[fe] < 0) continue;
        int X, Y;
        if (flipEdge(ft, fe, X, Y)) { flipped = true; break; }
      }
      if (!flipped) {
#ifdef MESHER_DEBUG
        fprintf(stderr, "recover(%d,%d): no flippable crossing edge (%d crossings)\n", a, b, (int)cross.size());
#endif
        return false;
      }
    }
    return false;
  }

  // ---- exterior removal --------------------------------------------------
  void removeExterior() {
    std::vector<char> ext(tris.size(), 0);
    std::deque<int> q;
    for (int k = 0; k < (int)tris.size(); k++) {
      if (!tris[k].alive) continue;
      for (int m = 0; m < 3; m++)
        if (tris[k].v[m] >= super0) {
          if (!ext[k]) { ext[k] = 1; q.push_back(k); }
          break;
        }
    }
    while (!q.empty()) {
      int k = q.front();
      q.pop_front();
      for (int m = 0; m < 3; m++) {
        int nb = tris[k].n[m];
        if (nb < 0 || tris[k].c[m] || ext[nb] || !tris[nb].alive) continue;
        ext[nb] = 1;
        q.push_back(nb);
      }
    }
    for (int k = 0; k < (int)tris.size(); k++)
      if (ext[k]) tris[k].alive = false;
    for (int k = 0; k < (int)tris.size(); k++) {
      if (!tris[k].alive) continue;
      for (int m = 0; m < 3; m++)
        if (tris[k].n[m] >= 0 && !tris[tris[k].n[m]].alive) tris[k].n[m] = -1;
    }
  }

  // ---- refinement ---------------------------------------------------------
  double dist2(int a, int b) {
    double dx = pts[2 * a] - pts[2 * b], dy = pts[2 * a + 1] - pts[2 * b + 1];
    return dx * dx + dy * dy;
  }

  double triArea(int t) {
    double* A = P(tris[t].v[0]);
    double* B = P(tris[t].v[1]);
    double* C = P(tris[t].v[2]);
    return 0.5 * ((B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1]));
  }

  // Segments incident to a vertex: corners touch two, on-segment Steiners
  // one, free vertices none.
  int segsOf(int v, int out[2]) {
    if (v < nIn) {
      out[0] = v == 0 ? nIn - 1 : v - 1;
      out[1] = v;
      return 2;
    }
    if (v < (int)vertSeg.size() && vertSeg[v] >= 0) {
      out[0] = vertSeg[v];
      return 1;
    }
    return 0;
  }

  // Shewchuk's "seditious edge" guard: the shortest edge spans two boundary
  // segments meeting at an acute input corner — refining it further only
  // ping-pongs, so quality processing skips such triangles.
  bool seditious(int p, int q) {
    int sp[2], sq[2];
    int np = segsOf(p, sp), nq = segsOf(q, sq);
    for (int i = 0; i < np; i++)
      for (int j = 0; j < nq; j++) {
        int s1 = sp[i], s2 = sq[j];
        if (s1 == s2) continue;
        int corner = -1;
        if ((s1 + 1) % nIn == s2) corner = s2;       // shared corner s2
        else if ((s2 + 1) % nIn == s1) corner = s1;  // shared corner s1
        if (corner < 0) continue;
        if (p == corner || q == corner) continue;
        if (acute[corner]) return true;
      }
    return false;
  }

  // Bad = larger than the area bound, or circumradius/shortest-edge ratio
  // beyond the min-angle bound (unless the seditious guard applies).
  bool isBad(int t) {
    double area = triArea(t);
    if (area <= 0) return false;
    if (maxArea > 0 && area > maxArea) return true;
    if (ratio2Max <= 0) return false;
    double l0 = dist2(tris[t].v[1], tris[t].v[2]);
    double l1 = dist2(tris[t].v[2], tris[t].v[0]);
    double l2 = dist2(tris[t].v[0], tris[t].v[1]);
    double lmin = std::min(l0, std::min(l1, l2));
    double r2 = (l0 * l1 * l2) / (16.0 * area * area);
    if (r2 / lmin <= ratio2Max) return false;
    int sa, sb;
    if (lmin == l0) { sa = tris[t].v[1]; sb = tris[t].v[2]; }
    else if (lmin == l1) { sa = tris[t].v[2]; sb = tris[t].v[0]; }
    else { sa = tris[t].v[0]; sb = tris[t].v[1]; }
    if (seditious(sa, sb)) return false;
    return true;
  }

  bool circumcenter(int t, double& cx, double& cy) {
    double* A = P(tris[t].v[0]);
    double* B = P(tris[t].v[1]);
    double* C = P(tris[t].v[2]);
    double d1x = B[0] - A[0], d1y = B[1] - A[1];
    double d2x = C[0] - A[0], d2y = C[1] - A[1];
    double d = 2 * (d1x * d2y - d1y * d2x);
    if (d == 0) return false;
    double q1 = d1x * d1x + d1y * d1y, q2 = d2x * d2x + d2y * d2y;
    cx = A[0] + (d2y * q1 - d1y * q2) / d;
    cy = A[1] + (d1x * q2 - d2x * q1) / d;
    return std::isfinite(cx) && std::isfinite(cy);
  }

  bool encroachedBy(const Seg& s, double x, double y) {
    double ux = pts[2 * s.u] - x, uy = pts[2 * s.u + 1] - y;
    double wx = pts[2 * s.w] - x, wy = pts[2 * s.w + 1] - y;
    return ux * wx + uy * wy < 0;
  }

  // A subsegment is encroached iff an adjacent triangle's apex lies in its
  // diametral circle (sufficient in a CDT).
  bool isEncroached(int segIdx) {
    const Seg& s = segs[segIdx];
    if (!s.alive || s.frozen) return false;
    int t, e;
    if (!edgeExists(s.u, s.w, t, e)) return false;
    int apex = tris[t].v[e];
    if (encroachedBy(s, pts[2 * apex], pts[2 * apex + 1])) return true;
    int nb = tris[t].n[e];
    if (nb >= 0) {
      int j = idxOfNeighbor(nb, t);
      int apex2 = tris[nb].v[j];
      if (encroachedBy(s, pts[2 * apex2], pts[2 * apex2 + 1])) return true;
    }
    return false;
  }

  // Split subsegment segIdx: midpoint normally, or a power-of-two offset
  // from the corner ("concentric shells") when one endpoint is an input
  // corner, so cascades around acute corners align and terminate.
  bool splitSeg(int segIdx) {
    Seg s = segs[segIdx];
    if (!s.alive || s.frozen) return false;
    double len2 = dist2(s.u, s.w);
    if (len2 < minSegLen2) {
      segs[segIdx].frozen = true;
      return false;
    }
    int t, e;
    if (!edgeExists(s.u, s.w, t, e)) return false;
    double ux = pts[2 * s.u], uy = pts[2 * s.u + 1];
    double wx = pts[2 * s.w], wy = pts[2 * s.w + 1];
    double x, y;
    bool uCorner = s.u < nIn, wCorner = s.w < nIn;
    if (uCorner != wCorner) {
      double cxp = uCorner ? ux : wx, cyp = uCorner ? uy : wy;
      double ox = uCorner ? wx : ux, oy = uCorner ? wy : uy;
      double len = std::sqrt(len2);
      double d = std::pow(2.0, std::round(std::log2(len * 0.5)));
      double f = d / len;
      if (f < 0.25 || f > 0.75) f = 0.5;
      x = cxp + f * (ox - cxp);
      y = cyp + f * (oy - cyp);
    } else {
      x = 0.5 * (ux + wx);
      y = 0.5 * (uy + wy);
    }
    int vi = addPoint(x, y, s.id);
    insertOnEdge(vi, t, e, segIdx);
    steiner++;
    return true;
  }

  int findSeg(int u, int w) {
    for (int k = 0; k < (int)segs.size(); k++) {
      if (!segs[k].alive) continue;
      if ((segs[k].u == u && segs[k].w == w) ||
          (segs[k].u == w && segs[k].w == u))
        return k;
    }
    return -1;
  }

  void refine() {
    std::deque<int> segQ;
    std::deque<std::pair<int, int>> triQ;  // (tri, retries)
    for (int k = 0; k < (int)segs.size(); k++)
      if (isEncroached(k)) segQ.push_back(k);
    for (int k = 0; k < (int)tris.size(); k++)
      if (tris[k].alive && isBad(k)) triQ.push_back({k, 0});

    long guard = 200000;
    while (guard-- > 0 && steiner < maxSteiner) {
      // rescan everything appended by the last operation
      auto afterInsert = [&](size_t triBase, size_t segBase) {
        for (size_t k = triBase; k < tris.size(); k++) {
          if (!tris[k].alive) continue;
          if (isBad((int)k)) triQ.push_back({(int)k, 0});
          for (int m = 0; m < 3; m++) {
            if (!tris[k].c[m]) continue;
            int si = findSeg(tris[k].v[(m + 1) % 3], tris[k].v[(m + 2) % 3]);
            if (si >= 0 && isEncroached(si)) segQ.push_back(si);
          }
        }
        (void)segBase;
      };

      if (!segQ.empty()) {
        int si = segQ.front();
        segQ.pop_front();
        if (!segs[si].alive || segs[si].frozen || !isEncroached(si)) continue;
        size_t triBase = tris.size(), segBase = segs.size();
        if (splitSeg(si)) afterInsert(triBase, segBase);
        continue;
      }
      if (triQ.empty()) break;
      auto [t, retries] = triQ.front();
      triQ.pop_front();
      if (!tris[t].alive || !isBad(t)) continue;
      if (retries > 50) continue;
      double cx, cy;
      if (!circumcenter(t, cx, cy)) continue;
      // Ruppert: if the circumcenter encroaches a subsegment, split that
      // subsegment instead of inserting the circumcenter. Only subsegments
      // existing at rejection time are split (children are re-judged by the
      // apex rule later) — recursing into fresh children against the same
      // rejected point grinds the boundary down to the length floor.
      bool pushed = false;
      int segsAtRejection = (int)segs.size();
      for (int k = 0; k < segsAtRejection; k++) {
        if (!segs[k].alive || segs[k].frozen) continue;
        if (encroachedBy(segs[k], cx, cy)) {
          size_t triBase = tris.size(), segBase = segs.size();
          if (splitSeg(k)) {
            afterInsert(triBase, segBase);
            pushed = true;
          }
          if (steiner >= maxSteiner) break;
        }
      }
      if (pushed) {
        triQ.push_back({t, retries + 1});
        continue;
      }
      int onEdge = -1, crossT = -1, crossE = -1;
      int loc = locate(cx, cy, t, onEdge, crossT, crossE);
      if (loc == -2) {
        // walk blocked by a boundary segment: split it instead
        int u = tris[crossT].v[(crossE + 1) % 3];
        int w = tris[crossT].v[(crossE + 2) % 3];
        int si = findSeg(u, w);
        size_t triBase = tris.size(), segBase = segs.size();
        if (si >= 0 && splitSeg(si)) {
          afterInsert(triBase, segBase);
          triQ.push_back({t, retries + 1});
        }
        continue;
      }
      if (loc < 0) continue;  // on a vertex or walk failed: give up on t
      if (onEdge >= 0 && tris[loc].c[onEdge]) {
        int u = tris[loc].v[(onEdge + 1) % 3];
        int w = tris[loc].v[(onEdge + 2) % 3];
        int si = findSeg(u, w);
        size_t triBase = tris.size(), segBase = segs.size();
        if (si >= 0 && splitSeg(si)) {
          afterInsert(triBase, segBase);
          triQ.push_back({t, retries + 1});
        }
        continue;
      }
      int vi = addPoint(cx, cy, -2);
      size_t triBase = tris.size(), segBase = segs.size();
      if (onEdge >= 0) insertOnEdge(vi, loc, onEdge, -1);
      else insertInterior(vi, loc);
      steiner++;
      afterInsert(triBase, segBase);
    }
  }

  // ---- driver -------------------------------------------------------------
  int run(const double* xy, int n, double areaMax, double minAngleDeg,
          int steinerCap) {
    exactinit();
    if (n < 3) return MESH_TOO_FEW_POINTS;
    nIn = n;
    maxArea = areaMax;
    maxSteiner = steinerCap > 0 ? steinerCap : 10000;
    if (minAngleDeg > 0 && minAngleDeg < 60) {
      double s = std::sin(minAngleDeg * M_PI / 180.0);
      double B = 1.0 / (2.0 * s);
      ratio2Max = B * B;
    } else {
      ratio2Max = 0;
    }

    pts.reserve(2 * (n + 3));
    for (int i = 0; i < n; i++) addPoint(xy[2 * i], xy[2 * i + 1], -1);

    // polygon signed area (degeneracy check; orientation is irrelevant)
    double sArea = 0;
    for (int i = 0; i < n; i++) {
      int j = (i + 1) % n;
      sArea += pts[2 * i] * pts[2 * j + 1] - pts[2 * j] * pts[2 * i + 1];
    }
    sArea *= 0.5;
    if (sArea == 0) return MESH_DEGENERATE;

    double minX = pts[0], maxX = pts[0], minY = pts[1], maxY = pts[1];
    for (int i = 1; i < n; i++) {
      minX = std::min(minX, pts[2 * i]);
      maxX = std::max(maxX, pts[2 * i]);
      minY = std::min(minY, pts[2 * i + 1]);
      maxY = std::max(maxY, pts[2 * i + 1]);
    }
    double cx = 0.5 * (minX + maxX), cy = 0.5 * (minY + maxY);
    double span = std::max(maxX - minX, maxY - minY);
    if (span == 0) return MESH_DEGENERATE;
    double diag = std::hypot(maxX - minX, maxY - minY);
    minSegLen2 = (diag * 1e-6) * (diag * 1e-6);

    super0 = n;
    int s0 = addPoint(cx - 20 * span, cy - 10 * span, -2);
    int s1 = addPoint(cx + 20 * span, cy - 10 * span, -2);
    int s2 = addPoint(cx, cy + 20 * span, -2);
    addTri(s0, s1, s2);

    // acute-corner table (wedge angle between the two incident segments)
    acute.assign(n, false);
    for (int i = 0; i < n; i++) {
      int prev = (i + n - 1) % n, next = (i + 1) % n;
      double ux = pts[2 * prev] - pts[2 * i], uy = pts[2 * prev + 1] - pts[2 * i + 1];
      double vx = pts[2 * next] - pts[2 * i], vy = pts[2 * next + 1] - pts[2 * i + 1];
      double lu = std::hypot(ux, uy), lv = std::hypot(vx, vy);
      if (lu == 0 || lv == 0) return MESH_DUPLICATE_POINTS;
      double c = (ux * vx + uy * vy) / (lu * lv);
      c = std::max(-1.0, std::min(1.0, c));
      if (std::acos(c) < M_PI / 3.0) acute[i] = true;
    }

    // insert the corners
    int last = 0;
    for (int i = 0; i < n; i++) {
      int onEdge = -1, ct = -1, ce = -1;
      int loc = locate(pts[2 * i], pts[2 * i + 1], last, onEdge, ct, ce);
      if (loc == -3) return MESH_DUPLICATE_POINTS;
      if (loc < 0) return MESH_INTERNAL;
      if (onEdge >= 0) insertOnEdge(i, loc, onEdge, -1);
      else insertInterior(i, loc);
      last = (int)tris.size() - 1;
    }

    // recover the boundary
    for (int i = 0; i < n; i++)
      if (!recoverSegment(i, (i + 1) % n, i)) return MESH_RECOVERY_FAILED;

    removeExterior();

    // sanity: some interior must remain
    bool any = false;
    for (auto& t : tris)
      if (t.alive) { any = true; break; }
    if (!any) return MESH_DEGENERATE;

    refine();
    return MESH_OK;
  }

  int emit(std::vector<double>& outPts, std::vector<int>& outTris) {
    int nV = (int)pts.size() / 2;
    std::vector<int> remap(nV, -1);
    for (int i = 0; i < nIn; i++) remap[i] = i;
    int next = nIn;
    for (int i = nIn + 3; i < nV; i++) remap[i] = next++;
    outPts.clear();
    outTris.clear();
    outPts.reserve(2 * (nV - 3));
    for (int i = 0; i < nV; i++) {
      if (i >= nIn && i < nIn + 3) continue;
      outPts.push_back(pts[2 * i]);
      outPts.push_back(pts[2 * i + 1]);
    }
    for (auto& t : tris) {
      if (!t.alive) continue;
      for (int m = 0; m < 3; m++)
        if (t.v[m] >= nIn && t.v[m] < nIn + 3) return MESH_INTERNAL;
      int a = remap[t.v[0]], b = remap[t.v[1]], c = remap[t.v[2]];
      outTris.push_back(a);
      outTris.push_back(b);
      outTris.push_back(c);
    }
    return MESH_OK;
  }
};

std::vector<double> g_outPts;
std::vector<int> g_outTris;

}  // namespace

extern "C" {

int mesh_polygon(const double* xy, int nPoints, double maxArea,
                 double minAngleDeg, int maxSteiner) {
  g_outPts.clear();
  g_outTris.clear();
  Mesher m;
  int code = m.run(xy, nPoints, maxArea, minAngleDeg, maxSteiner);
  if (code != MESH_OK) return code;
  return m.emit(g_outPts, g_outTris);
}

int mesh_num_points() { return (int)g_outPts.size() / 2; }
int mesh_num_triangles() { return (int)g_outTris.size() / 3; }
const double* mesh_points() { return g_outPts.data(); }
const int* mesh_triangles() { return g_outTris.data(); }

}  // extern "C"
