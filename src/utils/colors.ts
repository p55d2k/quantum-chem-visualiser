export function getColor(orbital: string) {
  switch (orbital) {
    case "1s":
      return "#00b3b3"; // Teal
    case "2s":
      return "#ff66b3"; // Pink
    case "2px":
      return "#ff6600"; // Orange
    case "2py":
      return "#66ff66"; // Light Green
    case "2pz":
      return "#3399ff"; // Sky Blue
    case "3s":
      return "#cc33ff"; // Purple
    case "3px":
      return "#ff9933"; // Dark Orange
    case "3py":
      return "#33cc33"; // Green
    case "3pz":
      return "#3366ff"; // Blue
    case "3dz2":
      return "#ff33cc"; // Magenta
    case "3dx2y2":
      return "#ff3333"; // Red
    case "3dxy":
      return "#33ff33"; // Bright Green
    case "3dxz":
      return "#33ccff"; // Cyan
    case "3dyz":
      return "#9966ff"; // Lavender

    // 4s and 4p orbitals
    case "4s":
      return "#ff66ff"; // Fuchsia
    case "4px":
      return "#ff9900"; // Darker Orange
    case "4py":
      return "#99ff66"; // Lime Green
    case "4pz":
      return "#66ccff"; // Light Blue

    // 4d orbitals
    case "4dz2":
      return "#ff66cc"; // Hot Pink
    case "4dx2y2":
      return "#ff5050"; // Coral Red
    case "4dxy":
      return "#66ff99"; // Mint Green
    case "4dxz":
      return "#66ffff"; // Aqua
    case "4dyz":
      return "#cc99ff"; // Periwinkle

    // 4f orbitals (using jewel tones for complexity)
    case "4fz3":
      return "#ff00ff"; // Pure Magenta
    case "4fyz2":
      return "#ff66aa"; // Pink-Rose
    case "4fxz2":
      return "#66aaff"; // Soft Blue
    case "4fxyz":
      return "#aaff66"; // Chartreuse
    case "4fzx2y2":
      return "#ffaa66"; // Peach
    case "4fy3x2y2":
      return "#66ffaa"; // Seafoam
    case "4fx3y2":
      return "#aa66ff"; // Lavender-Purple

    default:
      return "#ffffff"; // Default white
  }
}
