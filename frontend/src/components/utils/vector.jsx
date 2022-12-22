export function generateCone(x, y, z, color = "blue") {
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

export function generateLine(x, y, z, color = "blue") {
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

export function generateScatter(x, y, z) {
  return {
    x: x,
    y: y,
    z: z,
    mode: "markers",
    marker: {
      color: "rgb(127, 127, 127)",
      size: 12,
      symbol: "circle",
      line: {
        color: "rgb(204, 204, 204)",
        width: 1,
      },
      opacity: 0.8,
    },
    type: "scatter3d",
  };
}
