#include <cstdio>
#include <Eigen/Dense>

int main() {
    // Create a 3x3 matrix of floats
    Eigen::Matrix3f mat;
    mat << 1.0, 2.0, 3.0,
           4.0, 5.0, 6.0,
           7.0, 8.9, 9.1;

    // Print the matrix using printf (without streams)
    std::printf("Matrix mat:\n");
    for (int i = 0; i < mat.rows(); ++i) {
        for (int j = 0; j < mat.cols(); ++j) {
            std::printf("%f ", mat(i, j));  // Print element at (i, j)
        }
        std::printf("\n");
    }

    return 0;
}

extern "C" {
    int add(int a, int b) {
        return a + b;
    }
}

extern "C" {
    void printArray(float *data, int length) {
      printf("Print array \n");
      for (int i = 0; i < length; ++i) {
        printf("%f \n", data[i]);
      }
    }
  }

  extern "C" {
    void printNestedArray(float **data, int rows, int cols) {
    printf("Print nested array \n");
    for (int r = 0; r < rows; r++) {
      for (int c = 0; c < cols; c++) {
        printf("%f ", data[r][c]);
      }
      printf("\n");
    }
  }
}