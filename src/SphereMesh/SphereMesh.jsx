import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const SphereMesh = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );

  const renderer = new THREE.WebGL1Renderer();
  renderer.setSize(1300, 800);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // const geometry = new THREE.SphereGeometry(50, 20, 20);
  // const material = new THREE.MeshBasicMaterial({ color: "red" });
  // const sphere = new THREE.Mesh(geometry, material);
  // scene.add(sphere);

  const geometry = new THREE.PlaneGeometry(20, 20);
  const material = new THREE.MeshBasicMaterial({ color: "green" });
  // scene.add(plane);

  const geometryCircle = new THREE.CircleGeometry(5, 32);
  const materialCircle = new THREE.MeshBasicMaterial({ color: "transparent" });
  // const circle = new THREE.Mesh(geometryCircle, materialCircle);

  geometry.holes.push(geometryCircle);
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  camera.position.z = 50;

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  return <div></div>;
};

export default SphereMesh;
