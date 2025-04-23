#include <cstdio>

int main() {
    std::printf("Hello world!\n");

    return 0;
}

extern "C" {
    int add(int a, int b) {
        return a + b;
    }
}