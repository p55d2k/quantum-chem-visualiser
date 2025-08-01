project_name: Quantum Chemistry Visualizer

description: >
  An interactive web-based simulator that visualizes hydrogen atom orbitals (1s, 2s, 2p, 3d) using simplified analytical
  solutions to the Schrödinger equation. Designed to help A-level chemistry students understand electron probability
  densities and quantum numbers (n, l, m). Simulation is rendered in 3D, with optional 2D radial graphs.

target_users: 
  - A-level chemistry students
  - Teachers demonstrating quantum theory
  - STEM outreach coordinators and science fair audiences

project_goals:
  - Represent hydrogenic orbitals using real or approximate wavefunctions.
  - Let users explore different orbital shapes interactively.
  - Visually reinforce key concepts: quantum numbers, probability density, energy levels.
  - Ensure the simulation is visually intuitive, pedagogically accurate, and not overly complex.

chemistry_coverage:
  - Differences between Bohr orbits and quantum orbitals
  - Quantum numbers: principal (n), azimuthal (l), magnetic (m)
  - Electron cloud / probability density interpretation
  - Radial distribution functions for s-orbitals
  - Basic orbital geometries: spherical (s), dumbbell (p), cloverleaf (d)

technical_stack:
  frontend:
    - React.js for component architecture
    - Three.js (or React-Three-Fiber) for 3D rendering of orbitals
    - Plotly.js or D3.js for radial probability density graphs
    - TailwindCSS (optional) for clean UI design

  backend:
    - No backend required; computations run in-browser
    - Optionally: Flask or Node.js server for future features like downloadable images or storing progress

  computation_engine:
    - JavaScript/TypeScript math functions for orbitals
    - Simplified analytical forms of hydrogen radial and angular wavefunctions
    - Precomputed grid of probability densities for rendering speed (if needed)

core_features:
  - User selects quantum numbers (n, l, m) via dropdown or sliders
  - Orbital rendered in 3D as point cloud or iso-surface of probability density
  - Radial probability distribution graph shown for s orbitals (and others optionally)
  - Toggle between Bohr and quantum views (educational contrast)
  - Optional color-coded probability density heatmaps

stretch_features:
  - Animate time-evolution of wavefunction (using phase terms)
  - Bohr model visualization with transitions between energy levels
  - Export-to-image for orbital visualizations
  - Voiceover/narration or interactive quizzes

assumptions_and_constraints:
  - No relativistic corrections or spin-orbit coupling included
  - Only hydrogen atom (one-electron system) is modeled
  - All functions normalized for visualization but not physically precise scale
  - Project complexity must remain A-level appropriate

development_roadmap:
  step_1: Research and Planning
    - Review A-level chemistry material on orbitals and quantum numbers
    - Collect or derive simplified formulas for R(n,l)(r) and Y(l,m)(θ, φ)
    - Plan UI layout: control panel (left/right), visualization canvas (center)

  step_2: Orbital Computation Module
    - Implement radial wavefunctions (e.g., 1s: R ∝ exp(-r))
    - Implement angular shapes using spherical harmonics for p, d orbitals
    - Convert wavefunction to probability density: |ψ(r,θ,φ)|²
    - Map values to 3D point cloud grid with normalized color intensity

  step_3: 3D Rendering with Three.js
    - Create a WebGL canvas in React using Three.js or React-Three-Fiber
    - Render point clouds or iso-surfaces from probability grid
    - Add lighting and rotation controls for user interactivity

  step_4: UI Controls and Parameters
    - Build interface for selecting n, l, m values
    - Add tooltips or info boxes explaining selected values
    - Display calculated energy level for chosen quantum numbers

  step_5: 2D Graphing (Optional but Encouraged)
    - Plot radial probability density vs. distance from nucleus
    - Use Plotly or D3.js to create smooth, interactive line charts
    - Sync chart updates with selected orbital

  step_6: Educational Features and Explanations
    - Add a panel explaining:
        - What an orbital is
        - What each quantum number means
        - How shapes relate to chemistry (e.g., bonding)
    - Optional: Add text overlays for nodal planes or energy levels

  step_7: Deployment
    - Host using GitHub Pages, Vercel, or Netlify
    - Optimize performance by reducing point cloud resolution when needed
    - Document how to run locally and build

  step_8: Stretch Goals
    - Implement basic time-dependent wavefunction phase animation
    - Allow users to animate transitions between orbitals
    - Provide downloadable images or .glb model files of orbitals

collaborator_guidelines:
  - Always validate math functions with graphs before visualizing
  - Use React state to manage current quantum numbers
  - Keep computation separate from rendering components
  - Do not overcomplicate math; project is for A-level comprehension
  - Focus on clarity, interactivity, and scientific accuracy

