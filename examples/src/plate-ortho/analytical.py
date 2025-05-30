import numpy as np

# Plate dimensions
a = 10.0  # m
b = 10.0  # m
h = 0.15  # m
p0 = 1000.0  # N/m^2

# Material properties 
E_x = 1.0e10  # Pa
E_y = 1.0e10  # Pa
nu_xy = 0.25
G_xy = 0.5 * E_x / (1 + nu_xy)  

# Compute nu_yx
nu_yx = nu_xy * E_y / E_x

# Compute denominator
denom = 1 - nu_xy * nu_yx

# Compute flexural rigidities
D_11 = E_x * h**3 / (12 * denom)
D_22 = E_y * h**3 / (12 * denom)
D_12 = nu_xy * D_22
D_66 = G_xy * h**3 / 12
H = D_12 + 2 * D_66

# Number of terms for convergence
N_terms = 100

# Center of the plate
x = a / 2
y = b / 2

# Summation for Navier solution
total = 0.0
for m in range(1, 2 * N_terms + 1, 2):  # Odd m
    for n in range(1, 2 * N_terms + 1, 2):  # Odd n
        sin_term = np.sin(m * np.pi * x / a) * np.sin(n * np.pi * y / b)
        D_mn = (
            D_11 * (m * np.pi / a)**4
            + 2 * H * (m * np.pi / a)**2 * (n * np.pi / b)**2
            + D_22 * (n * np.pi / b)**4
        )
        total += sin_term / (m * n * D_mn)

# Correct deflection formula
w_center = (16 * p0 / np.pi**2) * total

# Print deflection in mm
print(f"Deflection: {w_center * 1000:.6f} mm")