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
        fontFamily: "sans-serif",
        zIndex: 10,
      }}
    >
      <label>
        Orbital:{" "}
        <select
          value={orbital}
          onChange={(e) => onChange({ orbital: e.target.value })}
        >
          <option value="1s">1s</option>
          <option value="2s">2s</option>
          <option value="2px">2px</option>
          <option value="2py">2py</option>
          <option value="2pz">2pz</option>
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
    </div>
  );
}
