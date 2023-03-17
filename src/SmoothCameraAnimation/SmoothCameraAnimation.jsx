import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const SmoothCameraAnimation = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 3;

  //   camera.position.y = 8;
  //   camera.position.x = 5;
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(1300, 800);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor("white");
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const edgesGeometry = new THREE.EdgesGeometry(geometry);
  const edgesMaterial = new THREE.LineBasicMaterial({ color: "black" });
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  cube.add(edges);

  const animate = () => {
    requestAnimationFrame(animate);
    // controls.update();
    renderer.render(scene, camera);
  };

  animate();

  const handleClick = () => {
    camera.position.set(0, 1, 3);
    controls.update();
    console.log(camera.position);
  };

  return (
    <div>
      <button className="btn" onClick={handleClick}>
        Return Camera
      </button>
    </div>
  );
};

export default SmoothCameraAnimation;
