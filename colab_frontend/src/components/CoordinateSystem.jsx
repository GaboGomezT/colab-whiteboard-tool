import React from "react";
import SceneInit from "./SceneInit";
import { useEffect } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

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

    const loader = new FontLoader();
    loader.load(
      // resource URL
      "node_modules/three/examples/fonts/helvetiker_bold.typeface.json",

      // onLoad callback
      function (font) {
        // Add Label to Y axis
        var x_axis_label = new TextGeometry("X", {
          font: font,
          size: 0.3,
          height: 0,
        });
        var x_axis_label_material = new THREE.MeshBasicMaterial({
          color: 0xff0000,
        });
        var x_axis_label_mesh = new THREE.Mesh(
          x_axis_label,
          x_axis_label_material
        );
        x_axis_label_mesh.position.set(10, -1, 0);
        environment.billboardText.push(x_axis_label_mesh);
        environment.scene.add(x_axis_label_mesh);

        // Add Label to Y axis
        var y_axis_label = new TextGeometry("Y", {
          font: font,
          size: 0.3,
          height: 0,
        });
        var y_axis_label_material = new THREE.MeshBasicMaterial({
          color: 0x00ff00,
        });
        var y_axis_label_mesh = new THREE.Mesh(
          y_axis_label,
          y_axis_label_material
        );
        y_axis_label_mesh.position.set(-0.5, 10, 0);
        environment.billboardText.push(y_axis_label_mesh);
        environment.scene.add(y_axis_label_mesh);

        // Add Label to Z axis
        var z_axis_label = new TextGeometry("Z", {
          font: font,
          size: 0.3,
          height: 0,
        });
        var z_axis_label_material = new THREE.MeshBasicMaterial({
          color: 0x0000ff,
        });
        var z_axis_label_mesh = new THREE.Mesh(
          z_axis_label,
          z_axis_label_material
        );
        z_axis_label_mesh.position.set(0, -1, 10);
        // z_axis_label_mesh.rotation.y = Math.PI / 2;
        environment.billboardText.push(z_axis_label_mesh);
        environment.scene.add(z_axis_label_mesh);

        // Adding number labels
        for (var i = -10; i <= 10; i++) {
          var label = new TextGeometry(i.toString(), {
            font: font,
            size: 0.2,
            height: 0,
          });

          var label_material = new THREE.MeshBasicMaterial({ color: 0x000000 });
          var x_label = new THREE.Mesh(label, label_material);
          x_label.position.set(i, -0.3, 0);
          environment.billboardText.push(x_label);
          environment.scene.add(x_label);

          var y_label = new THREE.Mesh(label, label_material);
          y_label.position.set(0.3, i, 0);
          environment.billboardText.push(y_label);
          environment.scene.add(y_label);

          var z_label = new THREE.Mesh(label, label_material);
          z_label.position.set(0, -0.3, i);
          // z_label.rotation.y = Math.PI / 2;
          environment.billboardText.push(z_label);
          environment.scene.add(z_label);
        }
      }
    );
  }, []);

  return <canvas id="myThreeJsCanvas" />;
}
