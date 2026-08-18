// Declarations for the vendored public-domain robust predicates
// (predicates.c, Jonathan Richard Shewchuk, placed in the public domain).
// orient2d/incircle are adaptive exact-arithmetic predicates; exactinit()
// must be called once before using them.
#ifndef AWATIF_PREDICATES_H
#define AWATIF_PREDICATES_H

#ifdef __cplusplus
extern "C" {
#endif

void exactinit(void);
double orient2d(double *pa, double *pb, double *pc);
double incircle(double *pa, double *pb, double *pc, double *pd);

#ifdef __cplusplus
}
#endif

#endif
