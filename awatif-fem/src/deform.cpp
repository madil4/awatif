#include <cstdio>
#include <map>

extern "C"
{
  void deform(double **nodes, int nodesLen, int **elements, int elementsLen, double **elasticities, int elasticitiesLen)
  {
    std::map<int, double> elasticitiesMap;

    for (int r = 0; r < elasticitiesLen; r++)
    {
      elasticitiesMap[elasticities[r][0]] = elasticities[r][1];
    }

    printf("Print Elasticities %zu \n", elasticitiesMap.size());
    printf("Print Elasticities %f \n", elasticitiesMap[0]);
  }
}