import { Line } from "@react-three/drei";

export default function Axes({ length = 10 }: { length?: number }) {
  const axisColor = (axis: string) => {
    switch (axis) {
      case "x":
        return "red";
      case "y":
        return "green";
      case "z":
        return "blue";
      default:
        return "white";
    }
  };

  return (
    <group>
      {/* X-axis (red) */}
      <Line
        points={[
          [-length, 0, 0],
          [length, 0, 0],
        ]} // Extends both directions
        color={axisColor("x")}
        lineWidth={2}
      />

      {/* Y-axis (green) */}
      <Line
        points={[
          [0, -length, 0],
          [0, length, 0],
        ]}
        color={axisColor("y")}
        lineWidth={2}
      />

      {/* Z-axis (blue) */}
      <Line
        points={[
          [0, 0, -length],
          [0, 0, length],
        ]}
        color={axisColor("z")}
        lineWidth={2}
      />
    </group>
  );
}
