import React from "react";
import SceneInit from "./SceneInit";
import { useEffect } from "react";
import * as THREE from "three";

export default function CoordinateSystem() {
  useEffect(() => {
    const environment = new SceneInit("myThreeJsCanvas");
    environment.initialize();
    environment.animate();

    // Create the coordinate system
    var x_axis_geometry = new THREE.BufferGeometry();
    var x_axis_positions = new Float32Array([-10, 0, 0, 10, 0, 0]);
    x_axis_geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(x_axis_positions, 3)
    );
    var x_axis_material = new THREE.LineBasicMaterial({
      color: 0xff0000,
    });
    var x_axis = new THREE.Line(x_axis_geometry, x_axis_material);
    environment.scene.add(x_axis);

    var y_axis_geometry = new THREE.BufferGeometry();
    var y_axis_positions = new Float32Array([0, -10, 0, 0, 10, 0]);
    y_axis_geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(y_axis_positions, 3)
    );
    var y_axis_material = new THREE.LineBasicMaterial({
      color: 0x00ff00,
    });
    var y_axis = new THREE.Line(y_axis_geometry, y_axis_material);
    environment.scene.add(y_axis);

    var z_axis_geometry = new THREE.BufferGeometry();
    var z_axis_positions = new Float32Array([0, 0, -10, 0, 0, 10]);
    z_axis_geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(z_axis_positions, 3)
    );
    var z_axis_material = new THREE.LineBasicMaterial({
      color: 0x0000ff,
    });
    var z_axis = new THREE.Line(z_axis_geometry, z_axis_material);
    environment.scene.add(z_axis);
  }, []);

  return <canvas id="myThreeJsCanvas" />;
}
