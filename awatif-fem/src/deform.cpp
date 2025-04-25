#include <cstdio>

extern "C"
{
  void deform(double **nodes, int nodesLen, int **elements, int elementsLen)
  {
    printf("Print Nodes \n");
    for (int r = 0; r < nodesLen; r++)
    {
      for (int c = 0; c < 3; c++)
      {
        printf("%f ", nodes[r][c]);
      }
      printf("\n");
    }

    printf("Print Elements \n");
    for (int r = 0; r < elementsLen; r++)
    {
      for (int c = 0; c < 3; c++)
      {
        printf("%i ", elements[r][c]);
      }
      printf("\n");
    }
  }
}