import React from "react";
import Plot from "react-plotly.js";
import { generateCone, generateLine } from "../utils/vector";

class Form extends React.Component {
  render() {
    const { onAdd, onChange, newValues } = this.props;
    return (
      <div>
        Vector A
        <br />
        <input
          type="number"
          id="x_2"
          onChange={onChange}
          placeholder="x_2"
          value={newValues.x_2}
        />
        <input
          type="number"
          id="y_2"
          onChange={onChange}
          placeholder="y_2"
          value={newValues.y_2}
        />
        <input
          type="number"
          id="z_2"
          onChange={onChange}
          placeholder="z_2"
          value={newValues.z_2}
        />
        <br />
        Vector B
        <br />
        <input
          type="number"
          id="u_2"
          onChange={onChange}
          placeholder="u_2"
          value={newValues.u_2}
        />
        <input
          type="number"
          id="v_2"
          onChange={onChange}
          placeholder="v_2"
          value={newValues.v_2}
        />
        <input
          type="number"
          id="w_2"
          onChange={onChange}
          placeholder="w_2"
          value={newValues.w_2}
        />
        <button onClick={onAdd}>Calcular</button>
      </div>
    );
  }
}

class VectorialProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      arrows: [],
      newvalues: {
        x_2: "",
        y_2: "",
        z_2: "",
        u_2: "",
        v_2: "",
        w_2: "",
      },
    };
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCalculate(e) {
    let arrows = [];
    const newdata = this.state.newvalues;
    var [x, y, z, u, v, w] = [[], [], [], [], [], []];

    // Primero desplegamos el Vector A
    x = [0, newdata.x_2];
    y = [0, newdata.y_2];
    z = [0, newdata.z_2];
    arrows.push(generateLine(x, y, z));
    arrows.push(generateCone(x, y, z));
    
    // Desplegamos el Vector B
    u = [0, newdata.u_2];
    v = [0, newdata.v_2];
    w = [0, newdata.w_2];
    arrows.push(generateLine(u, v, w));
    arrows.push(generateCone(u, v, w));

    // Calculamos el producto y lo desplegamos
    
    var result_x = [0, (y[1]*w[1]) - (z[1]*v[1])];
    var result_y = [0, (z[1]*u[1]) - (x[1]*w[1])];
    var result_z = [0, (x[1]*v[1]) - (y[1]*u[1])];
    arrows.push(generateLine(result_x, result_y, result_z, "red"));
    arrows.push(generateCone(result_x, result_y, result_z, "red"));
    this.setState({
      arrows: arrows,
      newvalues: {
        x_2: "",
        y_2: "",
        z_2: "",
        u_2: "",
        v_2: "",
        w_2: "",
      },
    });
  }

  handleChange(e) {
    const newdata = this.state.newvalues;
    const parsed = parseInt(e.target.value);
    newdata[e.target.id] = isNaN(parsed) ? 0 : parsed;
    this.setState({
      newvalues: newdata,
    });
  }

  render() {
    const { arrows, newvalues } = this.state;
    return (
      <div>
        <Form
          onAdd={this.handleCalculate}
          onChange={this.handleChange}
          newValues={newvalues}
        />
        <Plot
          data={arrows}
          layout={{ width: 640, height: 480, title: "Producto Cruz" }}
        />
      </div>
    );
  }
}

export default VectorialProduct;
