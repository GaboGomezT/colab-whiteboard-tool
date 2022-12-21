import React from "react";
import Plot from "react-plotly.js";
import { generateCone, generateLine } from "../utils/vector";

class Form extends React.Component {
  render() {
    const { onAdd, onChange, newValues } = this.props;
    return (
      <div>
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
    var [x, y, z] = [[], [], []];
    if (!arrows.length) {
      // Revisamos si el arreglo está vacío, significa que estamos sumando nuestro primer vector
      x = [0, newdata.x_2];
      y = [0, newdata.y_2];
      z = [0, newdata.z_2];
    } else {
      var lastArray = arrows[arrows.length - 2];
      console.log(lastArray);
      var x_1 = lastArray.x;
      var y_1 = lastArray.y;
      var z_1 = lastArray.z;
      console.log(x_1, y_1, z_1);
      x = [x_1[1], x_1[1] + newdata.x_2];
      y = [y_1[1], y_1[1] + newdata.y_2];
      z = [z_1[1], z_1[1] + newdata.z_2];
      console.log(x, y, z);
    }
    arrows.push(generateLine(x, y, z));
    arrows.push(generateCone(x, y, z));
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
    const { arrows, newvalues } = this.state;
    return (
      <div>
        <Form
          onAdd={this.handleAddVector}
          onChange={this.handleNewValuesChange}
          newValues={newvalues}
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
