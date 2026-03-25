---
title: "Nomenclature of Airfoils"
section: "AERO"
subject: "Aerodynamics"
topic: "Airfoils and Wings"
difficulty: "Easy"
isSpecial: false
formulas:
  - name: "NACA 4 Digit Series Airfoil"
    latex: "$$\text{NACA ABXX}$$"
    1st Digit A: max camber as % of chord
    2nd digit B: Position of max camber in tenths of chord
    3-4 digits XX: max thickness as percentage of chord
    
  - name: "NACA 5 Digit Series Airfoil"
    latex: "$$\text{Secondary\_LaTeX\_Here}$$"
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

# Nomenclature

## Overview

The airfoil nomenclature is standard for naming airfoils. As each airfoil shape generates unique pressure distribution, hence there can be infinite number of airfoils. Hence it is required to identify which airfoil shapes are actually suitable for specific case. To communicate this chosen shape in simple words rather than tedious drawings, nomenclature system is required. There are several airfoil nomnclature systems used. The important one for GATE exam syllabus is NACA 4 digit, NACA 5 digit, NACA 6 digit series. By infering the digits in the airfoil number, we can plot the overall shape of airfoil, which eases the manufacturing. 

## NACA 4 digit series airfoils

Each digit in this 4 digits tell us about the shape of airfoil as follows.
The first digit: It tells about the camber of the airfoil. Camber is the mean line between the 

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

$$\int_{CS} \rho(\vec{V} \cdot d\vec{A})\vec{V} + \frac{\partial}{\partial t} \int_{CV} \rho \vec{V} dV = \sum \vec{F}$$

For a 1D steady flow, this simplifies to:

$$P_1 A_1 + \dot{m}V_1 = P_2 A_2 + \dot{m}V_2$$

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
