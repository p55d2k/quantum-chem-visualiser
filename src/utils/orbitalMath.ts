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

// generates points for a given orbital with a specified probability function
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

export function generateOrbital(orbital = "1s", count = 10000) {
  console.log("Generating orbital:", orbital);
  switch (orbital) {
    case "1s":
      return generateOrbitalPoints(
        count,
        (r: number) => p1s(r)
      );
    case "2s":
      return generateOrbitalPoints(
        count,
        (r: number) => p2s(r)
      );
    case "2p":
      return generate2pOrbital(count);
    case "2px":
      return generate2pIndividual("2px", count);
    case "2py":
      return generate2pIndividual("2py", count);
    case "2pz":
      return generate2pIndividual("2pz", count);
    default:
      return [];
  }
}
