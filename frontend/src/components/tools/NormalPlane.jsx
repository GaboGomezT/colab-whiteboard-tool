import React from "react";
import Plot from "react-plotly.js";
import { generateCone, generateLine, generateScatter } from "../utils/vector";

class Form extends React.Component {
  render() {
    const { onAdd, onChange, newValues } = this.props;
    return (
      <div>
        Punto
        <br />
        <input
          type="number"
          id="x"
          onChange={onChange}
          placeholder="x"
          value={newValues.x}
        />
        <input
          type="number"
          id="y"
          onChange={onChange}
          placeholder="y"
          value={newValues.y}
        />
        <input
          type="number"
          id="z"
          onChange={onChange}
          placeholder="z"
          value={newValues.z}
        />
        <br />
        Vector
        <br />
        <input
          type="number"
          id="u"
          onChange={onChange}
          placeholder="u"
          value={newValues.u}
        />
        <input
          type="number"
          id="v"
          onChange={onChange}
          placeholder="v"
          value={newValues.v}
        />
        <input
          type="number"
          id="w"
          onChange={onChange}
          placeholder="w"
          value={newValues.w}
        />
        <button onClick={onAdd}>Calcular</button>
      </div>
    );
  }
}

class NormalPlane extends React.Component {
  constructor() {
    super();
    this.state = {
      arrows: [],
      newvalues: {
        x: "",
        y: "",
        z: "",
        u: "",
        v: "",
        w: "",
      },
    };
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCalculate(e) {
    let arrows = [];
    const newdata = this.state.newvalues;
    var [x, y, z, u, v, w] = [[], [], [], [], [], []];
    var [a, b, c] = [[], [], []];

    // Primero desplegamos el punto
    x = [newdata.x];
    y = [newdata.y];
    z = [newdata.z];
    arrows.push(generateScatter(x, y, z));

    // Desplegamos el Normal Vector
    u = [newdata.x, newdata.u + newdata.x];
    v = [newdata.y, newdata.v + newdata.y];
    w = [newdata.z, newdata.w + newdata.z];
    arrows.push(generateLine(u, v, w, "green"));
    arrows.push(generateCone(u, v, w, "green"));

    // Calculamos los 10 puntos alrededor del punto
    // en los tres ejes (x, y, z) y agregamos
    // los puntos que cumplen con la ecuación
    // del plano a una malla 3D
    for (let xi = newdata.x - 3; xi < newdata.x + 3; xi++) {
      for (let yi = newdata.y - 3; yi < newdata.y + 3; yi++) {
        for (let zi = newdata.z - 3; zi < newdata.z + 3; zi++) {
          var value =
            newdata.u * (xi - newdata.x) +
            newdata.v * (yi - newdata.y) +
            newdata.w * (zi - newdata.z);
          if (value == 0) {
            a.push(xi);
            b.push(yi);
            c.push(zi);
          }
        }
      }
    }

    arrows.push({
      alphahull: 5,
      opacity: 0.8,
      color: "rgb(200,100,300)",
      type: "mesh3d",
      x: a,
      y: b,
      z: c,
    });

    this.setState({
      arrows: arrows,
      newvalues: {
        x: "",
        y: "",
        z: "",
        u: "",
        v: "",
        w: "",
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
          layout={{
            width: 640,
            height: 480,
            title: "Plano a partir de un punto y el vector normal al plano",
          }}
        />
      </div>
    );
  }
}

export default NormalPlane;
