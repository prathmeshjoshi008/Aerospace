import re

syllabus = """
## Section 1: Engineering Mathematics (MATH)
* Subject: Linear Algebra
  * Core: Vector algebra, Matrix algebra, Systems of linear equations, Rank of a matrix, Eigen values, Eigen vectors.
* Subject: Calculus
  * Core: Functions of single variable, Limits, Continuity, Differentiability, Mean value theorem, Chain rule, Partial derivatives, Maxima and minima, Gradient, Divergence, Curl, Directional derivatives, Integration, Line/Surface/Volume integrals, Stokes/Gauss/Green Theorems.
* Subject: Differential Equations
  * Core: First order linear/nonlinear equations, Higher order linear ODEs, Partial differential equations, Separation of variables.
* Subject: Numerical & Complex (Special Topics)
  * Special: Fourier Series, Laplace Transforms, Numerical methods, Complex analysis, Probability and statistics.

## Section 2: Flight Mechanics (FLIGHT)
* Subject: Basics & Atmosphere
  * Core: Atmosphere properties, Standard atmosphere, Aircraft classification, Airplane parts, Air speeds, Flight instruments.
* Subject: Airplane Performance
  * Core: Drag polar, Take-off and landing, Steady climb and descent, Ceiling, Range and endurance, Load factor, V-n diagram, Winds.
* Subject: Static Stability
  * Core: Longitudinal stability, Tail position and size, Directional/Lateral stability, Wing dihedral, Sweep, Hinge moments.
* Subject: Dynamic Stability (Special Topics)
  * Special: Euler angles, Equations of motion, Decoupling of dynamics, Longitudinal/Lateral modes.

## Section 3: Space Dynamics (SPACE)
* Subject: Orbital Mechanics
  * Core: Central force motion, Trajectories, Orbital period, Kepler's laws, Escape velocity.

## Section 4: Aerodynamics (AERO)
* Subject: Fluid Mechanics
  * Core: Conservation laws, Dimensional analysis, Potential flow theory, Viscous flows, Boundary layers.
* Subject: Airfoils and Wings
  * Core: Nomenclature, Aerodynamic coefficients, Kutta-Joukowski theorem, Thin airfoil theory, Kutta condition, Finite wing theory, Induced drag, Lifting line theory, Critical Mach number.
* Subject: Compressible Flows
  * Core: Isentropic flows, Fanno flow, Rayleigh flow, Normal/Oblique shocks, Prandtl-Meyer flow, Nozzles and diffusers.
* Subject: Advanced Aero (Special Topics)
  * Special: Wind Tunnel Testing, Shock-boundary layer interaction.

## Section 5: Structures (STRUCT)
* Subject: Strength of Materials
  * Core: Stress/Strain transformations, Mohr's circle, Hooke's law, Failure theories, Castigliano's principles, Trusses and beams, Buckling.
* Subject: Flight Vehicle Structures
  * Core: Aircraft materials, Thin-walled sections, Aircraft loads.
* Subject: Structural Dynamics
  * Core: SDOF vibrations, 2-DOF systems.
* Subject: Elasticity & Vibrations (Special Topics)
  * Special: Vibration of beams, Theory of elasticity, Airy's stress function.

## Section 6: Propulsion (PROP)
* Subject: Aerothermodynamics
  * Core: Thermodynamics, Combustion, Thrust, Efficiency, Brayton cycle.
* Subject: Engine Performance
  * Core: Ramjet, Turbojet, Turbofan, Turboprop, Afterburners.
* Subject: Turbomachinery
  * Core: Axial/Centrifugal compressors, Stage dynamics, Degree of reaction, Axial turbines.
* Subject: Rockets
  * Core: Thrust equation, Specific impulse, Multi-staging, Chemical rockets.
* Subject: Advanced Propulsion (Special Topics)
  * Special: Intakes, Combustor and Nozzle aerothermodynamics, Turbine cooling, Surge and Stall.
"""

count = 0
for line in syllabus.split('\n'):
    line = line.strip()
    if line.startswith('* Core:') or line.startswith('* Special:'):
        # Extract the list of topics
        topics_str = line.split(':', 1)[1].strip()
        # Remove trailing period if present
        if topics_str.endswith('.'):
            topics_str = topics_str[:-1]

        # Split by comma
        topics = [t.strip() for t in topics_str.split(',') if t.strip()]
        count += len(topics)

print(f"Total topics: {count}")
