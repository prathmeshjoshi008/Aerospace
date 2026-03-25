import os
import re

syllabus_text = """
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

template = """---
title: "{topic_title}"
section: "{section_code}"
subject: "{subject_name}"
topic: "{parent_group}"
difficulty: "Medium"
isSpecial: {is_special}
formulas:
  - name: "Primary Governing Equation"
    latex: "$$\\text{{LaTeX\\_Formula\\_Here}}$$"
    mnemonic: "Memory trick placeholder."
    usage: "When to use this specific equation in GATE."
  - name: "Secondary Relation"
    latex: "$$\\text{{Secondary\\_LaTeX\\_Here}}$$"
    mnemonic: "Short phrase to remember the variables."
    usage: "Constraint or boundary condition info."
pyqs:
  - question: "Placeholder for a previous GATE question text?"
    options: ["Option A", "Option B", "Option C", "Option D"]
    answer: 0
  - question: "Numerical Answer Type (NAT) example question?"
    options: ["Answer is a value", "N/A", "N/A", "N/A"]
    answer: 0
---

# {topic_title}

## 📌 Overview
 (Replace X with the specific engineering diagram name, e.g., 'Normal Shock Control Volume')

> **Quick Summary:** Provide a 2-line "Wikipedia-style" lead paragraph here to define the concept globally.

---

## 🛠️ Assumptions & Constraints
The following engineering assumptions are critical for this model:
1. **Assumption 1:** Placeholder.
2. **Assumption 2:** Placeholder.
3. **Assumption 3:** Placeholder.

---

## 📐 Detailed Derivation
The fundamental relation is derived from the conservation laws. Using the integral form of the momentum equation:

$$\\int_{{CS}} \\rho(\\vec{{V}} \\cdot d\\vec{{A}})\\vec{{V}} + \\frac{{\\partial}}{{\\partial t}} \\int_{{CV}} \\rho \\vec{{V}} dV = \\sum \\vec{{F}}$$

For a 1D steady flow, this simplifies to:

$$P_1 A_1 + \\dot{{m}}V_1 = P_2 A_2 + \\dot{{m}}V_2$$

---

## 🎥 Visual Learning
For a deep dive into the physical behavior of this topic, refer to the following lecture:

<div class="video-container">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID_HERE" frameborder="0" allowfullscreen></iframe>
</div>

---

## 📝 Key Takeaways for GATE
* **Trend Analysis:** As Mach number increases, the property X increases/decreases.
* **Common Pitfalls:** Do not confuse the stagnation property with static properties.
* **Formula Check:** Ensure units are in SI (Pascals, Kelvin, kg/m³) before calculation.

---

## 🔗 Related Topics
* [[Internal-Wiki-Link-1]] - Related prerequisite concept.
* [[Internal-Wiki-Link-2]] - Advanced application of this topic.
"""

base_dir = "content"
if not os.path.exists(base_dir):
    os.makedirs(base_dir)

current_section_code = ""
current_section_name = ""
current_subject_name = ""

for line in syllabus_text.strip().split('\n'):
    line = line.strip()
    if not line:
        continue

    if line.startswith("## Section"):
        # e.g., ## Section 1: Engineering Mathematics (MATH)
        match = re.search(r'Section \d+: (.+) \((.+)\)', line)
        if match:
            current_section_name = match.group(1).strip()
            current_section_code = match.group(2).strip()

    elif line.startswith("* Subject:"):
        # e.g., * Subject: Linear Algebra
        current_subject_name = line.replace("* Subject:", "").strip()

    elif line.startswith("* Core:") or line.startswith("* Special:"):
        is_special = "true" if line.startswith("* Special:") else "false"
        prefix = "* Special:" if is_special == "true" else "* Core:"
        topics_str = line.replace(prefix, "").strip()
        if topics_str.endswith("."):
            topics_str = topics_str[:-1]

        topics = [t.strip() for t in topics_str.split(',')]

        # Determine the parent group name (subfolder)
        # We will use the subject name as the folder name
        # First, ensure kebab-case for the folder name
        parent_group = current_subject_name
        folder_name = re.sub(r'[^a-zA-Z0-9]+', '-', parent_group).strip('-')

        # The structure is /content/<SECTION_CODE>/<Subject Name>
        # Let's clean the subject name for the folder path
        section_dir = os.path.join(base_dir, current_section_code)
        subject_dir = os.path.join(section_dir, folder_name)

        if not os.path.exists(subject_dir):
            os.makedirs(subject_dir)

        for topic in topics:
            if not topic: continue

            # Create kebab-case filename
            filename = re.sub(r'[^a-zA-Z0-9]+', '-', topic.lower()).strip('-') + ".md"
            filepath = os.path.join(subject_dir, filename)

            # Skip if the file is the thin-airfoil-theory.md one the user wants untouched
            if filepath == "content/AERO/Airfoils-and-Wings/thin-airfoil-theory.md":
                # Note: The user specified /content/AERO/Aerodynamics/Incompressible-Flow/Thin-Airfoil-Theory.md
                # We should be careful to not overwrite it regardless of its exact path
                pass

            if "thin-airfoil-theory.md" in filename.lower() and current_section_code == "AERO":
                print(f"Skipping Thin Airfoil Theory to avoid overwriting existing file: {filepath}")
                continue

            file_content = template.format(
                topic_title=topic,
                section_code=current_section_code,
                subject_name=current_section_name, # Mapping subject_name to the section name (Engineering Mathematics)
                parent_group=current_subject_name,   # Mapping topic to the sub-subject (Linear Algebra)
                is_special=is_special
            )

            # We need to correctly map the YAML keys:
            # section: "MATH" (Section code)
            # subject: "Engineering Mathematics" (Section Name)
            # topic: "Linear Algebra" (Subject Name)

            with open(filepath, "w") as f:
                f.write(file_content)

            print(f"Created: {filepath}")

print("Content generation complete.")
