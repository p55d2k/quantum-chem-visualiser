import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import ControlsPanel, {
  type ControlsPanelProps,
} from "./components/ControlsPanel";
import OrbitalPointCloud from "./components/OrbitalPointCloud";
import Axes from "./components/Axes";

import { useEffect, useRef, useState } from "react";
import "./App.css";

import { generateOrbital } from "./utils/orbitalMath";

function App() {
  const orbitRef = useRef<any>(null);

  const [settings, setSettings] = useState<ControlsPanelProps>({
    orbital: "1s",
    pointCount: 50000,
    autoRotate: true,
    showAxes: true,
  });

  const [points, setPoints] = useState(
    generateOrbital(settings.orbital, settings.pointCount)
  );

  useEffect(() => {
    const newPoints = generateOrbital(settings.orbital, settings.pointCount);
    setPoints(newPoints);
  }, [settings.orbital, settings.pointCount]);

  return (
    <div className="container">
      <ControlsPanel
        {...settings}
        onChange={(newSettings) => setSettings({ ...settings, ...newSettings })}
      />

      <Canvas camera={{ position: [5, 5, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <OrbitControls
          ref={orbitRef}
          autoRotate={settings.autoRotate}
          autoRotateSpeed={settings.autoRotate ? 0.5 : 0}
        />

        <OrbitalPointCloud
          points={points}
          orbital={settings.orbital}
          orbitRef={orbitRef}
          align={settings.align}
          setSettings={setSettings}
        />
        {settings.showAxes && <Axes length={1000} />}
      </Canvas>
    </div>
  );
}

export default App;
