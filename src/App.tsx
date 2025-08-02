import { useState } from "react";
import OrbitalCanvas from "./components/OrbitalCanvas";
import "./App.css";

function App() {
  const [orbital, setOrbital] = useState("1s");

  return (
    <div className="container">
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
          color: "white",
        }}
      >
        <label htmlFor="orbital">Select orbital: </label>
        <select
          id="orbital"
          value={orbital}
          onChange={(e) => setOrbital(e.target.value)}
        >
          <option value="1s">1s</option>
          <option value="2s">2s</option>
          <option value="2p">2p</option>
          <option value="2px">2px</option>
          <option value="2py">2py</option>
          <option value="2pz">2pz</option>
        </select>
      </div>

      <OrbitalCanvas orbital={orbital} />
    </div>
  );
}

export default App;
