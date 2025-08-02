import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import OrbitalPointCloud from "./OrbitalPointCloud";
import Axes from "./Axes";

export default function OrbitalCanvas({ orbital }: { orbital: string }) {
  return (
    <Canvas camera={{ position: [5, 5, 15], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls autoRotate autoRotateSpeed={0.5} />
      <OrbitalPointCloud orbital={orbital} />
      <Axes length={1000} />
    </Canvas>
  );
}
