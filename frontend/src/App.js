import React from "react";
import "./App.css";
import DrawingTool from "./components/drawingtool";
import Pentool from "./components/penciltool";
import Plot from "react-plotly.js";

function App() {
  const tri = [
    [0, 1, 2],
    [0, 2, 3],
    [0, 3, 1],
    [1, 2, 3],
  ];

  const x = [0.5, 1];
  const y = [1, 2];
  const z = [0, 0.5];

  const arrow = [
    {
      x: x,
      y: y,
      z: z,
      mode: "lines",
      type: "scatter3d",
      hoverinfo: "none",
      line: {
        color: "blue",
        width: 3,
      },
    },
    {
      type: "cone",
      x: [x[1]],
      y: [y[1]],
      z: [z[1]],
      u: [0.3 * (x[1] - x[0])],
      v: [0.3 * (y[1] - y[0])],
      w: [0.3 * (z[1] - z[0])],
      anchor: "tip", // make cone tip be at endpoint
      hoverinfo: "none",
      colorscale: [
        [0, "blue"],
        [1, "blue"],
      ], // color all cones blue
      showscale: false,
    },
  ];
  return (
    <div className="App">
      <DrawingTool />
      {/* <Plot
        data={[
          {
            x: [0, 1, 0, 0],
            y: [0, 0, 1, 0],
            z: [0, 0, 0, 1],
            i: tri.map(function (f) {
              return f[0];
            }),
            j: tri.map(function (f) {
              return f[1];
            }),
            k: tri.map(function (f) {
              return f[2];
            }),
            type: "mesh3d",
            facecolor: [
              "rgb(0, 0, 0)",
              "rgb(255, 0, 0)",
              "rgb(0, 255, 0)",
              "rgb(0, 0, 255)",
            ],
            flatshading: true,
          },
        ]}
        layout={{ width: 640, height: 480, title: "Plano en 3D" }}
      />
      <Plot
        data={arrow}
        layout={{ width: 640, height: 480, title: "Vector en 3D" }}
      /> */}
    </div>
  );
}

export default App;
