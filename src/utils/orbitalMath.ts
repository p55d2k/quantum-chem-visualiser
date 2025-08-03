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

//  probability functions
// 1s orbital
function p1s(r: number) {
  return r * r * Math.exp(-2 * r);
}

// 2s orbital
function p2s(r: number) {
  const term = 2 - r;
  return r * r * term * term * Math.exp(-r);
}

// 2p orbital functions with proper angular dependence
// generates radial part for 2p orbital
function p2p_radial(r: number) {
  return r * r * r * r * Math.exp(-r); // r^4 * e^(-r) for 2p radial part
}

// generates angular part for 2pz orbital
function p2p_z(r: number, theta: number, _phi: number) {
  return p2p_radial(r) * Math.cos(theta) * Math.cos(theta); // cos²θ for 2pz
}

// generates angular part for 2px orbital
function p2p_x(r: number, theta: number, phi: number) {
  return (
    p2p_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.cos(phi) *
    Math.cos(phi)
  ); // sin²θ cos²φ for 2px
}

// generates angular part for 2py orbital
function p2p_y(r: number, theta: number, phi: number) {
  return (
    p2p_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(phi) *
    Math.sin(phi)
  ); // sin²θ sin²φ for 2py
}

// 3s orbital
function p3s(r: number) {
  const term = 27 - 18 * r + 2 * r * r;
  return r * r * term * term * Math.exp((-2 * r) / 3);
}

// 3p radial part (common for all 3p orbitals)
function p3p_radial(r: number) {
  const term = 6 - r;
  return r * r * r * r * term * term * Math.exp((-2 * r) / 3);
}

// 3d radial part (common for all 3d orbitals)
function p3d_radial(r: number) {
  return r * r * r * r * r * r * Math.exp((-2 * r) / 3);
}

// 3pz orbital
function p3p_z(r: number, theta: number, _phi: number) {
  return p3p_radial(r) * Math.cos(theta) * Math.cos(theta);
}

// 3px orbital
function p3p_x(r: number, theta: number, phi: number) {
  return (
    p3p_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.cos(phi) *
    Math.cos(phi)
  );
}

// 3py orbital
function p3p_y(r: number, theta: number, phi: number) {
  return (
    p3p_radial(r) *
    Math.sin(theta) *
    Math.sin(theta) *
    Math.sin(phi) *
    Math.sin(phi)
  );
}

// 3dz² orbital
function p3d_z2(r: number, theta: number, _phi: number) {
  return (
    p3d_radial(r) *
    (3 * Math.cos(theta) * Math.cos(theta) - 1) *
    (3 * Math.cos(theta) * Math.cos(theta) - 1)
  );
}

// 3dx²-y² orbital
function p3d_x2y2(r: number, theta: number, phi: number) {
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
function p3d_xy(r: number, theta: number, phi: number) {
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
function p3d_xz(r: number, theta: number, phi: number) {
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
function p3d_yz(r: number, theta: number, phi: number) {
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

// generates points for a given orbital with a specified probability function
// uses rejection sampling (Monte Carlo)
function generateOrbitalPoints(
  count: number,
  probFunc: (r: number, theta: number, phi: number) => number
) {
  const points = [];
  let attempts = 0;
  const maxAttempts = count * 10;

  // Better maxProb estimation
  let maxProb = 0;
  for (let i = 0; i < 1000; i++) {
    const r = Math.random() * 10;
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * 2 * Math.PI;
    const prob = probFunc(r, theta, phi);
    if (prob > maxProb) maxProb = prob;
  }

  while (points.length < count && attempts < maxAttempts) {
    const r = Math.random() * 10;
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
      return generateOrbitalPoints(count, p2p_x);
    case "2py":
      return generateOrbitalPoints(count, p2p_y);
    case "2pz":
      return generateOrbitalPoints(count, p2p_z);
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
      return generateOrbitalPoints(count, p3d_z2);
    case "3dx2y2":
      return generateOrbitalPoints(count, p3d_x2y2);
    case "3dxy":
      return generateOrbitalPoints(count, p3d_xy);
    case "3dxz":
      return generateOrbitalPoints(count, p3d_xz);
    case "3dyz":
      return generateOrbitalPoints(count, p3d_yz);
    default:
      return [];
  }
}

function generate3pIndividual(orbital: string, count: number) {
  switch (orbital) {
    case "3px":
      return generateOrbitalPoints(count, p3p_x);
    case "3py":
      return generateOrbitalPoints(count, p3p_y);
    case "3pz":
      return generateOrbitalPoints(count, p3p_z);
    default:
      return [];
  }
}

export function generateOrbital(orbital = "1s", count = 10000) {
  console.log("Generating orbital:", orbital);
  switch (orbital) {
    case "1s":
      return generateOrbitalPoints(count, (r: number) => p1s(r));
    case "2s":
      return generateOrbitalPoints(count, (r: number) => p2s(r));
    case "2p":
      return generate2pOrbital(count);
    case "2px":
      return generate2pIndividual("2px", count);
    case "2py":
      return generate2pIndividual("2py", count);
    case "2pz":
      return generate2pIndividual("2pz", count);
    case "3s":
      return generateOrbitalPoints(count, (r: number) => p3s(r));
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
    default:
      return [];
  }
}
