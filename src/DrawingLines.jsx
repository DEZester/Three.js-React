import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const DrawingLines = () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(800, 500);
  renderer.setClearColor(0x000000, 0);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  const material = new THREE.LineBasicMaterial({ color: "blue" }); //материал для линии
  const points = [];

  //задаем точки для нашей линии которую будем рисовать, рисуем через векторы
  points.push(new THREE.Vector3(-20, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(20, 0, 0));

  //задаем геометрию для нашей линии через точки
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material); //соединяем
  line.position.set(0, 0, 0);
  scene.add(line); //добавляем на сйцену нашу линию

  const controls = new OrbitControls(camera, renderer.domElement);

  function controlCameraOrbit() {
    //обновляем нашу камеру каждую секунду
    requestAnimationFrame(controlCameraOrbit);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update(); //апдейт нашей камеры

    renderer.render(scene, camera);
  }

  controlCameraOrbit();

  renderer.render(scene, camera);

  return <div>hello</div>;
};

export default DrawingLines;
