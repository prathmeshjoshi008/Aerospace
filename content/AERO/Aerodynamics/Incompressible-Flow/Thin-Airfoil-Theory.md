---
title: "Thin Airfoil Theory"
section: "AERO"
subject: "Aerodynamics"
topic: "Incompressible Flow"
subtopic: "Thin Airfoil Theory"
difficulty: "Medium"
formulas:
  - name: "Lift Coefficient (Thin Airfoil)"
    latex: "$c_l = 2\\pi\\alpha$"
    description: "The 2D lift coefficient for a symmetric thin airfoil in incompressible potential flow."
    usage: "Used to calculate section lift given the angle of attack."
    example: "For an angle of attack $\\alpha = 2^\\circ = 0.0349$ rad, $c_l = 2\\pi(0.0349) \\approx 0.219$."
    mnemonic: "Two pi alpha, the simplest lift formula."
  - name: "Moment Coefficient (Quarter Chord)"
    latex: "$c_{m, c/4} = -\\frac{\\pi}{2}(A_1 - A_2)$"
    description: "The pitching moment coefficient about the quarter chord point for a cambered thin airfoil."
    usage: "Critical for calculating aircraft stability."
pyqs:
  - question: "What is the theoretical lift curve slope for a 2D thin airfoil in incompressible flow?"
    options: ["$\\pi$", "$2\\pi$", "$4\\pi$", "$\\frac{\\pi}{2}"]
    answer: 1
---

## Introduction to Thin Airfoil Theory

Thin airfoil theory is a foundational concept in aerodynamics developed by Max Munk and refined by Hermann Glauert. It provides a simple but powerful analytical method to estimate the aerodynamic characteristics of airfoils in 2D, incompressible, potential flow.

### Assumptions

1. The fluid is **incompressible** and **inviscid**.
2. The flow is **irrotational** (potential flow).
3. The airfoil is very **thin** (thickness $\to 0$).
4. The camber is small, and the angle of attack $\alpha$ is small.

By placing a vortex sheet along the camber line of the airfoil, we can model the circulation that generates lift.

### The Fundamental Equation

The boundary condition requires that the flow must be tangent to the camber line. This gives us the fundamental equation of thin airfoil theory:

$$ \frac{1}{2\pi} \int_0^c \frac{\gamma(x)}{\xi - x} d\xi = V_\infty \left( \alpha - \frac{dz}{dx} \right) $$

Where:
* $\gamma(x)$ is the vortex sheet strength
* $V_\infty$ is the freestream velocity
* $\alpha$ is the angle of attack
* $dz/dx$ is the slope of the camber line

### Lift Calculation

For a symmetric airfoil ($dz/dx = 0$), the lift coefficient simplifies dramatically:

$$ c_l = 2\pi\alpha $$

As you can see, the lift coefficient $c_l$ increases linearly with the angle of attack $\alpha$, with a theoretical lift curve slope $a_0 = 2\pi$ per radian. This matches experimental data closely for small angles!
