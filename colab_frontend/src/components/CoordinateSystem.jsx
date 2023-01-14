import React from "react";
import SceneInit from "./SceneInit";
import { useEffect } from "react";
import * as THREE from "three";

export default function CoordinateSystem() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initialize();
    test.animate();

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    test.scene.add(boxMesh);
  }, []);

  return <canvas id="myThreeJsCanvas" />;
}
