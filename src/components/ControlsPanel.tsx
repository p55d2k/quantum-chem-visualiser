import { getColor } from "../utils/colors";

export type ControlsPanelProps = {
  orbital: string;
  pointCount: number;
  autoRotate: boolean;
  showAxes: boolean;
  align?: "x" | "y" | "z";
  onChange?: (settings: {
    orbital?: string;
    pointCount?: number;
    autoRotate?: boolean;
    showAxes?: boolean;
    align?: "x" | "y" | "z";
  }) => void;
};

export default function ControlsPanel({
  orbital,
  pointCount,
  autoRotate,
  showAxes,
  onChange,
}: ControlsPanelProps) {
  if (!onChange) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        background: "rgba(255, 255, 255, 0.8)",
        padding: "1.5rem",
        borderRadius: "8px",
        fontSize: "16px",
        zIndex: 10,
      }}
    >
      <label>
        Orbital:{" "}
        <select
          value={orbital}
          onChange={(e) => onChange({ orbital: e.target.value })}
          style={{
            background: `linear-gradient(90deg, ${getColor(
              orbital
            )} 2%, white 2%)`,
            paddingLeft: "20px",
          }}
        >
          {[
            "1s",
            "2s",
            "2px",
            "2py",
            "2pz",
            "3s",
            "3px",
            "3py",
            "3pz",
            "3dz2",
            "3dx2y2",
            "3dxy",
            "3dxz",
            "3dyz",
            "4s",
            "4px",
            "4py",
            "4pz",
            "4dz2",
            "4dx2y2",
            "4dxy",
            "4dxz",
            "4dyz",
            "4fz3",
            "4fyz2",
            "4fxz2",
            "4fxyz",
            "4fzx2y2",
            "4fy3x2y2",
            "4fx3y2",
          ].map((orb) => (
            <option
              key={orb}
              value={orb}
              style={{ backgroundColor: getColor(orb) }}
            >
              {orb} ({getColor(orb)})
            </option>
          ))}
        </select>
      </label>

      <br />

      <label>
        Point Count:{" "}
        <input
          type="range"
          min={1000}
          max={200000}
          step={1000}
          value={pointCount}
          onChange={(e) =>
            onChange({ pointCount: parseInt(e.target.value, 10) })
          }
        />
        {pointCount}
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          checked={autoRotate}
          onChange={(e) => onChange({ autoRotate: e.target.checked })}
        />
        Auto-Rotate
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          checked={showAxes}
          onChange={(e) => onChange({ showAxes: e.target.checked })}
        />
        Show Axes (Red/X, Green/Y, Blue/Z)
      </label>

      <br />

      <div>
        <strong>Align View:</strong>
        <br />
        <button onClick={() => onChange({ align: "x" })}>Align X</button>{" "}
        <button onClick={() => onChange({ align: "y" })}>Align Y</button>{" "}
        <button onClick={() => onChange({ align: "z" })}>Align Z</button>
      </div>

      <br />

      {/* <Link to="/about">Go to About Page</Link> */}
    </div>
  );
}
