import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const CubeWithEdges = () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 15;
  camera.position.y = 8;
  camera.position.x = 5;
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor("white");
  renderer.setSize(1300, 800);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const geometry = new THREE.BoxGeometry(5, 5, 5);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  const cube = new THREE.Mesh(geometry, material);
  //   cube.position.z = -15;
  scene.add(cube);
  //Создаем грани для нрашего куба
  const edgesGeometry = new THREE.EdgesGeometry(geometry);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: "black",
    linewidth: 2,
  });
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  cube.add(edges);

  const animate = () => {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;

    renderer.render(scene, camera);
  };

  animate();

  return <div>Game</div>;
};

export default CubeWithEdges;
