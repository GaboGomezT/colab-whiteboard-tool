export function generateCone(x, y, z, color="blue") {
  return {
    type: "cone",
    x: [x[1]],
    y: [y[1]],
    z: [z[1]],
    u: [0.3 * (x[1] - x[0])],
    v: [0.3 * (y[1] - y[0])],
    w: [0.3 * (z[1] - z[0])],
    anchor: "tip",
    hoverinfo: "none",
    colorscale: [
      [0, color],
      [1, color],
    ],
    showscale: false,
  };
}

export function generateLine(x, y, z, color="blue") {
  return {
    x: x,
    y: y,
    z: z,
    mode: "lines",
    type: "scatter3d",
    hoverinfo: "none",
    line: {
      color: color,
      width: 3,
    },
  };
}
