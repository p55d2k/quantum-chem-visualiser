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
        >
          <option value="1s">1s (Teal)</option>
          <option value="2s">2s (Pink)</option>
          <option value="2px">2px (Orange)</option>
          <option value="2py">2py (Light Green)</option>
          <option value="2pz">2pz (Sky Blue)</option>
          <option value="3s">3s (Purple)</option>
          <option value="3px">3px (Dark Orange)</option>
          <option value="3py">3py (Green)</option>
          <option value="3pz">3pz (Blue)</option>
          <option value="3dz2">3dz² (Magenta)</option>
          <option value="3dx2y2">3dx²-y² (Red)</option>
          <option value="3dxy">3dxy (Bright Green)</option>
          <option value="3dxz">3dxz (Cyan)</option>
          <option value="3dyz">3dyz (Lavender)</option>
        </select>
      </label>

      <br />

      <label>
        Point Count:{" "}
        <input
          type="range"
          min={1000}
          max={50000}
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
