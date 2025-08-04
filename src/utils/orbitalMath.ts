// generates a random unit vector
function randomUnitVector() {
  const theta = Math.acos(2 * Math.random() - 1);
  const phi = 2 * Math.PI * Math.random();
  return {
    x: Math.sin(theta) * Math.cos(phi),
    y: Math.sin(theta) * Math.sin(phi),
    z: Math.cos(theta),
    theta,
    phi,
  };
}

// helper func to get principal quantum number
function getPrincipalQuantumNumber(orbital: string): number {
  return parseInt(orbital.charAt(0)); // Extracts the number from "1s", "2px", etc.
}

//  probability functions
// 1s orbital
export function p1s(r: number) {
  return r * r * Math.exp(-2 * r);
}

// 2s orbital
export function p2s(r: number) {
  const term = 2 - r;
  return r * r * term * term * Math.exp(-r);
}

// 2p orbital functions with proper angular dependence
// generates radial part for 2p orbital
export function p2p_radial(r: number) {
  return r * r * r * r * Math.exp(-r); // r^4 * e^(-r) for 2p radial part
}

// generates angular part for 2pz orbital
export function p2p_z(r: number, theta: number, _phi: number) {
  return p2p_radial(r) * Math.cos(theta) * Math.cos(theta); // cos²θ for 2pz
}

// generates angular part for 2px orbital
export function p2p_x(r: number, theta: number, phi: number) {
  return (
    p2p_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.cos(phi) *
    Math.cos(phi)
  ); // sin²θ cos²φ for 2px
}

// generates angular part for 2py orbital
export function p2p_y(r: number, theta: number, phi: number) {
  return (
    p2p_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(phi) *
    Math.sin(phi)
  ); // sin²θ sin²φ for 2py
}

// 3s orbital
export function p3s(r: number) {
  const term = 27 - 18 * r + 2 * r * r;
  return r * r * term * term * Math.exp((-2 * r) / 3);
}

// 3p radial part (common for all 3p orbitals)
export function p3p_radial(r: number) {
  const term = 6 - r;
  return r * r * r * r * term * term * Math.exp((-2 * r) / 3);
}

// 3d radial part (common for all 3d orbitals)
export function p3d_radial(r: number) {
  return r * r * r * r * r * r * Math.exp((-2 * r) / 3);
}

// 3pz orbital
export function p3p_z(r: number, theta: number, _phi: number) {
  return p3p_radial(r) * Math.cos(theta) * Math.cos(theta);
}

// 3px orbital
export function p3p_x(r: number, theta: number, phi: number) {
  return (
    p3p_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.cos(phi) *
    Math.cos(phi)
  );
}

// 3py orbital
export function p3p_y(r: number, theta: number, phi: number) {
  return (
    p3p_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(phi) *
    Math.sin(phi)
  );
}

// 3dz² orbital
export function p3d_z2(r: number, theta: number, _phi: number) {
  return (
    p3d_radial(r) *
    (3 * Math.cos(theta) * Math.cos(theta) - 1) *
    (3 * Math.cos(theta) * Math.cos(theta) - 1)
  );
}

// 3dx²-y² orbital
export function p3d_x2y2(r: number, theta: number, phi: number) {
  return (
    p3d_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.cos(2 * phi) *
    Math.cos(2 * phi)
  );
}

// 3dxy orbital
export function p3d_xy(r: number, theta: number, phi: number) {
  return (
    p3d_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(2 * phi) *
    Math.sin(2 * phi)
  );
}

// 3dxz orbital
export function p3d_xz(r: number, theta: number, phi: number) {
  return (
    p3d_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.cos(theta) *
    Math.cos(theta) *
    Math.cos(phi) *
    Math.cos(phi)
  );
}

// 3dyz orbital
export function p3d_yz(r: number, theta: number, phi: number) {
  return (
    p3d_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.cos(theta) *
    Math.cos(theta) *
    Math.sin(phi) *
    Math.sin(phi)
  );
}

// Probability functions for n=4 orbitals
// 4s orbital
export function p4s(r: number) {
  const term = 192 - 144 * r + 24 * r * r - r * r * r;
  return r * r * term * term * Math.exp(-r / 2);
}

// 4p radial part (common for all 4p orbitals)
export function p4p_radial(r: number) {
  const term = 80 - 20 * r + r * r;
  return r * r * r * r * term * term * Math.exp(-r / 2);
}

// 4d radial part (common for all 4d orbitals)
export function p4d_radial(r: number) {
  const term = 12 - r;
  return r * r * r * r * r * r * term * term * Math.exp(-r / 2);
}

// 4f radial part (common for all 4f orbitals)
export function p4f_radial(r: number) {
  return r * r * r * r * r * r * r * r * Math.exp(-r / 2);
}

// 4pz orbital
export function p4p_z(r: number, theta: number, _phi: number) {
  return p4p_radial(r) * Math.cos(theta) * Math.cos(theta);
}

// 4px orbital
export function p4p_x(r: number, theta: number, phi: number) {
  return (
    p4p_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.cos(phi) *
    Math.cos(phi)
  );
}

// 4py orbital
export function p4p_y(r: number, theta: number, phi: number) {
  return (
    p4p_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(phi) *
    Math.sin(phi)
  );
}

// 4dz² orbital
export function p4d_z2(r: number, theta: number, _phi: number) {
  return (
    p4d_radial(r) *
    (3 * Math.cos(theta) * Math.cos(theta) - 1) *
    (3 * Math.cos(theta) * Math.cos(theta) - 1)
  );
}

// 4dx²-y² orbital
export function p4d_x2y2(r: number, theta: number, phi: number) {
  return (
    p4d_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.cos(2 * phi) *
    Math.cos(2 * phi)
  );
}

// 4dxy orbital
export function p4d_xy(r: number, theta: number, phi: number) {
  return (
    p4d_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(2 * phi) *
    Math.sin(2 * phi)
  );
}

// 4dxz orbital
export function p4d_xz(r: number, theta: number, phi: number) {
  return (
    p4d_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.cos(theta) *
    Math.cos(theta) *
    Math.cos(phi) *
    Math.cos(phi)
  );
}

// 4dyz orbital
export function p4d_yz(r: number, theta: number, phi: number) {
  return (
    p4d_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.cos(theta) *
    Math.cos(theta) *
    Math.sin(phi) *
    Math.sin(phi)
  );
}

// 4fz³ orbital
export function p4f_z3(r: number, theta: number, _phi: number) {
  const ct = Math.cos(theta);
  return (
    p4f_radial(r) * Math.cos(theta) ** 2 * (5 * Math.cos(theta) ** 2 - 3) ** 2
  );

  return p4f_radial(r) * ct * ct * ct * ct * ct * ct;
}

// 4fyz² orbital
export function p4f_yz2(r: number, theta: number, phi: number) {
  const st = Math.sin(theta);
  const ct = Math.cos(theta);
  return (
    p4f_radial(r) * st * ct * ct * st * ct * ct * Math.sin(phi) * Math.sin(phi)
  );
}

// 4fxz² orbital
export function p4f_xz2(r: number, theta: number, phi: number) {
  const st = Math.sin(theta);
  const ct = Math.cos(theta);
  return (
    p4f_radial(r) * st * ct * ct * st * ct * ct * Math.cos(phi) * Math.cos(phi)
  );
}

// 4fxyz orbital
export function p4f_xyz(r: number, theta: number, phi: number) {
  const st = Math.sin(theta);
  return p4f_radial(r) * Math.sin(theta) ** 3 * Math.sin(phi) * Math.cos(phi);

  return (
    p4f_radial(r) *
    st *
    st *
    st *
    st *
    st *
    st *
    Math.sin(phi) *
    Math.cos(phi) *
    Math.sin(2 * phi) *
    Math.sin(2 * phi)
  );
}

// 4fz(x²-y²) orbital
export function p4f_zx2y2(r: number, theta: number, phi: number) {
  const st = Math.sin(theta);
  const ct = Math.cos(theta);
  return (
    p4f_radial(r) *
    st *
    st *
    ct *
    st *
    st *
    ct *
    Math.cos(2 * phi) *
    Math.cos(2 * phi)
  );
}

// 4fy(3x²-y²) orbital
export function p4f_y3x2y2(r: number, theta: number, phi: number) {
  const st = Math.sin(theta);
  return (
    p4f_radial(r) *
    st *
    st *
    st *
    st *
    st *
    st *
    Math.sin(3 * phi) *
    Math.sin(3 * phi)
  );
}

// 4fx(x²-3y²) orbital
export function p4f_x3y2(r: number, theta: number, phi: number) {
  const st = Math.sin(theta);
  return (
    p4f_radial(r) *
    st *
    st *
    st *
    st *
    st *
    st *
    Math.cos(3 * phi) *
    Math.cos(3 * phi)
  );
}

// generates points for a given orbital with a specified probability function
// uses rejection sampling (Monte Carlo)
function generateOrbitalPoints(
  count: number,
  probFunc: (r: number, theta: number, phi: number) => number,
  orbitalType: string
) {
  const points = [];
  let attempts = 0;
  const n = getPrincipalQuantumNumber(orbitalType);
  const maxR = 10 * n; // Scale range with n
  const maxAttempts = count * 10;

  // Better maxProb estimation
  let maxProb = 0;
  for (let i = 0; i < 1000; i++) {
    const r = Math.random() * maxR;
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * 2 * Math.PI;
    const prob = probFunc(r, theta, phi);
    if (prob > maxProb) maxProb = prob;
  }

  while (points.length < count && attempts < maxAttempts) {
    const r = Math.random() * maxR;
    const dir = randomUnitVector();
    const prob = probFunc(r, dir.theta, dir.phi);
    const threshold = Math.random() * maxProb;

    if (prob > threshold) {
      points.push([r * dir.x, r * dir.y, r * dir.z]);
    }
    attempts++;
  }

  return points;
}

// generate all 2p orbitals in a single pass with proper weighting
function generate2pOrbital(count: number) {
  const points = [];
  let attempts = 0;
  const maxAttempts = count * 10;

  // find maximum probability across all three 2p orbitals
  let maxProb = 0;
  for (let i = 0; i < 1000; i++) {
    const r = Math.random() * 10;
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * 2 * Math.PI;

    const prob_x = p2p_x(r, theta, phi);
    const prob_y = p2p_y(r, theta, phi);
    const prob_z = p2p_z(r, theta, phi);

    maxProb = Math.max(maxProb, prob_x, prob_y, prob_z);
  }

  while (points.length < count && attempts < maxAttempts) {
    const r = Math.random() * 10;
    const dir = randomUnitVector();

    // calculate probabilities for all three 2p orbitals
    const prob_x = p2p_x(r, dir.theta, dir.phi);
    const prob_y = p2p_y(r, dir.theta, dir.phi);
    const prob_z = p2p_z(r, dir.theta, dir.phi);

    // combined probability (equal weighting of all three orbitals)
    const totalProb = (prob_x + prob_y + prob_z) / 3;
    const threshold = Math.random() * maxProb;

    if (totalProb > threshold) {
      points.push([r * dir.x, r * dir.y, r * dir.z]);
    }
    attempts++;
  }

  return points;
}

// Alternative: Generate individual 2p orbitals for clearer visualization
function generate2pIndividual(orbital: string, count: number) {
  switch (orbital) {
    case "2px":
      return generateOrbitalPoints(count, p2p_x, orbital);
    case "2py":
      return generateOrbitalPoints(count, p2p_y, orbital);
    case "2pz":
      return generateOrbitalPoints(count, p2p_z, orbital);
    default:
      return [];
  }
}

function generate3pOrbital(count: number) {
  const points = [];
  let attempts = 0;
  const maxAttempts = count * 10;

  // find maximum probability across all three 3p orbitals
  let maxProb = 0;
  for (let i = 0; i < 1000; i++) {
    const r = Math.random() * 20; // Increased range for n=3 orbitals
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * 2 * Math.PI;

    const prob_x = p3p_x(r, theta, phi);
    const prob_y = p3p_y(r, theta, phi);
    const prob_z = p3p_z(r, theta, phi);

    maxProb = Math.max(maxProb, prob_x, prob_y, prob_z);
  }

  while (points.length < count && attempts < maxAttempts) {
    const r = Math.random() * 20;
    const dir = randomUnitVector();

    const prob_x = p3p_x(r, dir.theta, dir.phi);
    const prob_y = p3p_y(r, dir.theta, dir.phi);
    const prob_z = p3p_z(r, dir.theta, dir.phi);

    const totalProb = (prob_x + prob_y + prob_z) / 3;
    const threshold = Math.random() * maxProb;

    if (totalProb > threshold) {
      points.push([r * dir.x, r * dir.y, r * dir.z]);
    }
    attempts++;
  }

  return points;
}

function generate3dOrbital(count: number) {
  const points = [];
  let attempts = 0;
  const maxAttempts = count * 10;

  // find maximum probability across all five 3d orbitals
  let maxProb = 0;
  for (let i = 0; i < 1000; i++) {
    const r = Math.random() * 20;
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * 2 * Math.PI;

    const prob_z2 = p3d_z2(r, theta, phi);
    const prob_x2y2 = p3d_x2y2(r, theta, phi);
    const prob_xy = p3d_xy(r, theta, phi);
    const prob_xz = p3d_xz(r, theta, phi);
    const prob_yz = p3d_yz(r, theta, phi);

    maxProb = Math.max(maxProb, prob_z2, prob_x2y2, prob_xy, prob_xz, prob_yz);
  }

  while (points.length < count && attempts < maxAttempts) {
    const r = Math.random() * 20;
    const dir = randomUnitVector();

    const prob_z2 = p3d_z2(r, dir.theta, dir.phi);
    const prob_x2y2 = p3d_x2y2(r, dir.theta, dir.phi);
    const prob_xy = p3d_xy(r, dir.theta, dir.phi);
    const prob_xz = p3d_xz(r, dir.theta, dir.phi);
    const prob_yz = p3d_yz(r, dir.theta, dir.phi);

    const totalProb = (prob_z2 + prob_x2y2 + prob_xy + prob_xz + prob_yz) / 5;
    const threshold = Math.random() * maxProb;

    if (totalProb > threshold) {
      points.push([r * dir.x, r * dir.y, r * dir.z]);
    }
    attempts++;
  }

  return points;
}

function generate3dIndividual(orbital: string, count: number) {
  switch (orbital) {
    case "3dz2":
      return generateOrbitalPoints(count, p3d_z2, orbital);
    case "3dx2y2":
      return generateOrbitalPoints(count, p3d_x2y2, orbital);
    case "3dxy":
      return generateOrbitalPoints(count, p3d_xy, orbital);
    case "3dxz":
      return generateOrbitalPoints(count, p3d_xz, orbital);
    case "3dyz":
      return generateOrbitalPoints(count, p3d_yz, orbital);
    default:
      return [];
  }
}

function generate3pIndividual(orbital: string, count: number) {
  switch (orbital) {
    case "3px":
      return generateOrbitalPoints(count, p3p_x, orbital);
    case "3py":
      return generateOrbitalPoints(count, p3p_y, orbital);
    case "3pz":
      return generateOrbitalPoints(count, p3p_z, orbital);
    default:
      return [];
  }
}

// Generation functions for n=4 orbitals
function generate4pOrbital(count: number) {
  const points = [];
  let attempts = 0;
  const maxAttempts = count * 10;
  const maxR = 30; // Increased range for n=4 orbitals

  let maxProb = 0;
  for (let i = 0; i < 1000; i++) {
    const r = Math.random() * maxR;
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * 2 * Math.PI;

    const prob_x = p4p_x(r, theta, phi);
    const prob_y = p4p_y(r, theta, phi);
    const prob_z = p4p_z(r, theta, phi);

    maxProb = Math.max(maxProb, prob_x, prob_y, prob_z);
  }

  while (points.length < count && attempts < maxAttempts) {
    const r = Math.random() * maxR;
    const dir = randomUnitVector();

    const prob_x = p4p_x(r, dir.theta, dir.phi);
    const prob_y = p4p_y(r, dir.theta, dir.phi);
    const prob_z = p4p_z(r, dir.theta, dir.phi);

    const totalProb = (prob_x + prob_y + prob_z) / 3;
    const threshold = Math.random() * maxProb;

    if (totalProb > threshold) {
      points.push([r * dir.x, r * dir.y, r * dir.z]);
    }
    attempts++;
  }

  return points;
}

function generate4dOrbital(count: number) {
  const points = [];
  let attempts = 0;
  const maxAttempts = count * 10;
  const maxR = 30;

  let maxProb = 0;
  for (let i = 0; i < 1000; i++) {
    const r = Math.random() * maxR;
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * 2 * Math.PI;

    const prob_z2 = p4d_z2(r, theta, phi);
    const prob_x2y2 = p4d_x2y2(r, theta, phi);
    const prob_xy = p4d_xy(r, theta, phi);
    const prob_xz = p4d_xz(r, theta, phi);
    const prob_yz = p4d_yz(r, theta, phi);

    maxProb = Math.max(maxProb, prob_z2, prob_x2y2, prob_xy, prob_xz, prob_yz);
  }

  while (points.length < count && attempts < maxAttempts) {
    const r = Math.random() * maxR;
    const dir = randomUnitVector();

    const prob_z2 = p4d_z2(r, dir.theta, dir.phi);
    const prob_x2y2 = p4d_x2y2(r, dir.theta, dir.phi);
    const prob_xy = p4d_xy(r, dir.theta, dir.phi);
    const prob_xz = p4d_xz(r, dir.theta, dir.phi);
    const prob_yz = p4d_yz(r, dir.theta, dir.phi);

    const totalProb = (prob_z2 + prob_x2y2 + prob_xy + prob_xz + prob_yz) / 5;
    const threshold = Math.random() * maxProb;

    if (totalProb > threshold) {
      points.push([r * dir.x, r * dir.y, r * dir.z]);
    }
    attempts++;
  }

  return points;
}

function generate4fOrbital(count: number) {
  const points = [];
  let attempts = 0;
  const maxAttempts = count * 15; // More attempts for complex orbitals
  const maxR = 40;

  let maxProb = 0;
  for (let i = 0; i < 1500; i++) {
    // More samples for complex orbitals
    const r = Math.random() * maxR;
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * 2 * Math.PI;

    const prob_z3 = p4f_z3(r, theta, phi);
    const prob_yz2 = p4f_yz2(r, theta, phi);
    const prob_xz2 = p4f_xz2(r, theta, phi);
    const prob_xyz = p4f_xyz(r, theta, phi);
    const prob_zx2y2 = p4f_zx2y2(r, theta, phi);
    const prob_y3x2y2 = p4f_y3x2y2(r, theta, phi);
    const prob_x3y2 = p4f_x3y2(r, theta, phi);

    maxProb = Math.max(
      maxProb,
      prob_z3,
      prob_yz2,
      prob_xz2,
      prob_xyz,
      prob_zx2y2,
      prob_y3x2y2,
      prob_x3y2
    );
  }

  while (points.length < count && attempts < maxAttempts) {
    const r = Math.random() * maxR;
    const dir = randomUnitVector();

    const prob_z3 = p4f_z3(r, dir.theta, dir.phi);
    const prob_yz2 = p4f_yz2(r, dir.theta, dir.phi);
    const prob_xz2 = p4f_xz2(r, dir.theta, dir.phi);
    const prob_xyz = p4f_xyz(r, dir.theta, dir.phi);
    const prob_zx2y2 = p4f_zx2y2(r, dir.theta, dir.phi);
    const prob_y3x2y2 = p4f_y3x2y2(r, dir.theta, dir.phi);
    const prob_x3y2 = p4f_x3y2(r, dir.theta, dir.phi);

    const totalProb =
      (prob_z3 +
        prob_yz2 +
        prob_xz2 +
        prob_xyz +
        prob_zx2y2 +
        prob_y3x2y2 +
        prob_x3y2) /
      7;
    const threshold = Math.random() * maxProb;

    if (totalProb > threshold) {
      points.push([r * dir.x, r * dir.y, r * dir.z]);
    }
    attempts++;
  }

  return points;
}

function generate4pIndividual(orbital: string, count: number) {
  switch (orbital) {
    case "4px":
      return generateOrbitalPoints(count, p4p_x, orbital);
    case "4py":
      return generateOrbitalPoints(count, p4p_y, orbital);
    case "4pz":
      return generateOrbitalPoints(count, p4p_z, orbital);
    default:
      return [];
  }
}

function generate4dIndividual(orbital: string, count: number) {
  switch (orbital) {
    case "4dz2":
      return generateOrbitalPoints(count, p4d_z2, orbital);
    case "4dx2y2":
      return generateOrbitalPoints(count, p4d_x2y2, orbital);
    case "4dxy":
      return generateOrbitalPoints(count, p4d_xy, orbital);
    case "4dxz":
      return generateOrbitalPoints(count, p4d_xz, orbital);
    case "4dyz":
      return generateOrbitalPoints(count, p4d_yz, orbital);
    default:
      return [];
  }
}

function generate4fIndividual(orbital: string, count: number) {
  switch (orbital) {
    case "4fz3":
      return generateOrbitalPoints(count, p4f_z3, orbital);
    case "4fyz2":
      return generateOrbitalPoints(count, p4f_yz2, orbital);
    case "4fxz2":
      return generateOrbitalPoints(count, p4f_xz2, orbital);
    case "4fxyz":
      return generateOrbitalPoints(count, p4f_xyz, orbital);
    case "4fzx2y2":
      return generateOrbitalPoints(count, p4f_zx2y2, orbital);
    case "4fy3x2y2":
      return generateOrbitalPoints(count, p4f_y3x2y2, orbital);
    case "4fx3y2":
      return generateOrbitalPoints(count, p4f_x3y2, orbital);
    default:
      return [];
  }
}

export function generateOrbital(orbital = "1s", count = 10000) {
  console.log("Generating orbital:", orbital);
  switch (orbital) {
    case "1s":
      return generateOrbitalPoints(count, (r: number) => p1s(r), orbital);
    case "2s":
      return generateOrbitalPoints(count, (r: number) => p2s(r), orbital);
    case "2p":
      return generate2pOrbital(count);
    case "2px":
      return generate2pIndividual("2px", count);
    case "2py":
      return generate2pIndividual("2py", count);
    case "2pz":
      return generate2pIndividual("2pz", count);
    case "3s":
      return generateOrbitalPoints(count, (r: number) => p3s(r), orbital);
    case "3p":
      return generate3pOrbital(count);
    case "3px":
      return generate3pIndividual("3px", count);
    case "3py":
      return generate3pIndividual("3py", count);
    case "3pz":
      return generate3pIndividual("3pz", count);
    case "3d":
      return generate3dOrbital(count);
    case "3dz2":
      return generate3dIndividual("3dz2", count);
    case "3dx2y2":
      return generate3dIndividual("3dx2y2", count);
    case "3dxy":
      return generate3dIndividual("3dxy", count);
    case "3dxz":
      return generate3dIndividual("3dxz", count);
    case "3dyz":
      return generate3dIndividual("3dyz", count);
    case "4s":
      return generateOrbitalPoints(count, (r: number) => p4s(r), orbital);
    case "4p":
      return generate4pOrbital(count);
    case "4px":
      return generate4pIndividual("4px", count);
    case "4py":
      return generate4pIndividual("4py", count);
    case "4pz":
      return generate4pIndividual("4pz", count);
    case "4d":
      return generate4dOrbital(count);
    case "4dz2":
      return generate4dIndividual("4dz2", count);
    case "4dx2y2":
      return generate4dIndividual("4dx2y2", count);
    case "4dxy":
      return generate4dIndividual("4dxy", count);
    case "4dxz":
      return generate4dIndividual("4dxz", count);
    case "4dyz":
      return generate4dIndividual("4dyz", count);
    case "4f":
      return generate4fOrbital(count);
    case "4fz3":
      return generate4fIndividual("4fz3", count);
    case "4fyz2":
      return generate4fIndividual("4fyz2", count);
    case "4fxz2":
      return generate4fIndividual("4fxz2", count);
    case "4fxyz":
      return generate4fIndividual("4fxyz", count);
    case "4fzx2y2":
      return generate4fIndividual("4fzx2y2", count);
    case "4fy3x2y2":
      return generate4fIndividual("4fy3x2y2", count);
    case "4fx3y2":
      return generate4fIndividual("4fx3y2", count);
    default:
      return [];
  }
}
