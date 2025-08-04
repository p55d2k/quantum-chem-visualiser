import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { getColor } from "../utils/colors";

export default function OrbitalPointCloud({
  points,
  orbital,
  orbitRef,
  setSettings,
  align,
}: {
  points: number[][];
  orbital: string;
  orbitRef: any;
  setSettings: any;
  align?: "x" | "y" | "z";
}) {
  const { camera } = useThree();

  const positions = useMemo(() => new Float32Array(points.flat()), [points]);

  const bufferAttributeRef = useRef<THREE.BufferAttribute>(null);

  useEffect(() => {
    if (bufferAttributeRef.current) {
      bufferAttributeRef.current.array = positions;
      bufferAttributeRef.current.needsUpdate = true;
    }
  }, [positions]);

  useEffect(() => {
    if (align === undefined) return;

    const original_x = Math.max(camera.position.x, 15);
    const original_y = Math.max(camera.position.y, 15);
    const original_z = Math.max(camera.position.z, 15);

    if (align === "x") {
      camera.position.set(original_x, 0, 0);
    } else if (align === "y") {
      camera.position.set(0, original_y, 0);
    } else if (align === "z") {
      camera.position.set(0, 0, original_z);
    }

    camera.lookAt(0, 0, 0);
    orbitRef.current?.update();

    setSettings((prev: any) => ({
      ...prev,
      align: undefined,
      autoRotate: false,
    }));
  }, [align]);

  return (
    <points>
      1
      <bufferGeometry>
        <bufferAttribute
          ref={bufferAttributeRef}
          attach="attributes-position"
          args={[positions, 3]}
          needsUpdate
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={getColor(orbital)} />
    </points>
  );
}
