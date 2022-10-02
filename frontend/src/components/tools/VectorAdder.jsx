import React from "react";
import Plot from "react-plotly.js";

class Form extends React.Component {
  render() {
    const { onAdd, onChange } = this.props;
    return (
      <div>
        <input type="number" id="x_2" onChange={onChange} placeholder="x_2" />
        <input type="number" id="y_2" onChange={onChange} placeholder="y_2" />
        <input type="number" id="z_2" onChange={onChange} placeholder="z_2" />
        <button onClick={onAdd}>Sumar</button>
      </div>
    );
  }
}

class VectorAdder extends React.Component {
  constructor() {
    super();
    this.state = {
      arrows: [],
      newvalues: {
        x_2: 0,
        y_2: 0,
        z_2: 0,
      },
    };
    this.handleAddVector = this.handleAddVector.bind(this);
    this.handleNewValuesChange = this.handleNewValuesChange.bind(this);
  }

  handleAddVector(e) {
    let arrows = this.state.arrows;
    const newdata = this.state.newvalues;
    const x = [0, newdata.x_2];
    const y = [0, newdata.y_2];
    const z = [0, newdata.z_2];
    arrows.push({
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
    });
    arrows.push({
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
    });
    this.setState({
      arrows: arrows,
      newvalues: {
        x_2: 0,
        y_2: 0,
        z_2: 0,
      },
    });
  }

  handleNewValuesChange(e) {
    const newdata = this.state.newvalues;
    const parsed = parseInt(e.target.value);
    newdata[e.target.id] = isNaN(parsed) ? 0 : parsed;
    this.setState({
      newvalues: newdata,
    });
  }

  render() {
    const { arrows } = this.state;
    return (
      <div>
        <Form
          onAdd={this.handleAddVector}
          onChange={this.handleNewValuesChange}
        />
        <Plot
        data={arrows}
        layout={{ width: 640, height: 480, title: "Vector en 3D" }}
      />
      </div>
    );
  }
}

export default VectorAdder;
