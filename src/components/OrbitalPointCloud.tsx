import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

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

    if (align === "x") {
      camera.position.set(15, 0, 0);
    } else if (align === "y") {
      camera.position.set(0, 15, 0);
    } else if (align === "z") {
      camera.position.set(0, 0, 15);
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
      <pointsMaterial
        size={0.03}
        color={
          orbital == "1s"
            ? "#00b3b3" // Teal for 1s
            : orbital == "2s"
            ? "#ff66b3" // Pink for 2s
            : orbital == "2px"
            ? "#ff6600" // Orange for 2px
            : orbital == "2py"
            ? "#66ff66" // Light Green for 2py
            : orbital == "2pz"
            ? "#3399ff" // Sky Blue for 2pz
            : orbital == "3s"
            ? "#cc33ff" // Purple for 3s
            : orbital == "3px"
            ? "#ff9933" // Dark Orange for 3px
            : orbital == "3py"
            ? "#33cc33" // Green for 3py
            : orbital == "3pz"
            ? "#3366ff" // Blue for 3pz
            : orbital == "3dz2"
            ? "#ff33cc" // Magenta for 3dz2
            : orbital == "3dx2y2"
            ? "#ff3333" // Red for 3dx2y2
            : orbital == "3dxy"
            ? "#33ff33" // Bright Green for 3dxy
            : orbital == "3dxz"
            ? "#33ccff" // Cyan for 3dxz
            : orbital == "3dyz"
            ? "#9966ff" // Lavender for 3dyz
            : "#ffffff" // Default white
        }
      />
    </points>
  );
}
