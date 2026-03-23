# Project Architecture: GATE Aerospace Preparation Platform

## 1. Project Overview
This project is a high-performance, statically generated educational platform for GATE Aerospace (AE) preparation. It does not use a traditional database. Instead, all course content, formulas, and quizzes are stored locally in Markdown (`.md`) files. The application parses these files to dynamically generate a specific 3-pane interactive user interface.

## 2. Technology Stack
Jules, you must strictly adhere to this stack:
* **Framework:** Next.js (App Router) - Use static site generation (SSG) where possible for speed.
* **Styling:** Tailwind CSS.
* **Icons:** `lucide-react`.
* **Markdown Parsing:** * `react-markdown` (for rendering the main content).
  * `remark-gfm` (for tables and GitHub flavored markdown).
  * `remark-math` and `rehype-katex` (CRITICAL: Must flawlessly render inline `$` and block `$$` LaTeX equations for complex aerospace fluid dynamics and orbital mechanics).
  * `gray-matter` (for parsing YAML frontmatter).
* **State Management:** React Context API (for managing the active pane states) and `js-cookie` (for tracking user progress).

## 3. Data Architecture (The Markdown Database)
All content lives in the `/content` directory, organized by Sections relevant to the GATE AE syllabus (e.g., `/content/MATH/`, `/content/AERO/` for Aerodynamics, `/content/PROP/` for Propulsion, `/content/STRUCT/` for Structures).

Every `.md` file MUST contain this YAML Frontmatter schema. You will build a utility function to parse all `.md` files on build and generate a global JSON map of this metadata.

```yaml
---
title: String (e.g., "Thin Airfoil Theory")
section: String (e.g., "AERO")
subject: String (e.g., "Aerodynamics")
topic: String (e.g., "Incompressible Flow")
subtopic: String
difficulty: String ("Easy" | "Medium" | "Hard")
formulas: 
  - name: String
    latex: String (The exact LaTeX string, e.g., "$c_l = 2\pi\alpha$")
    description: String
    usage: String
    example: String
    mnemonic: String
pyqs:
  - question: String
    options: [String, String, String, String]
    answer: Number (Index of correct option)
---
