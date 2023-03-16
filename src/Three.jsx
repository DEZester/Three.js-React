import * as THREE from "three";
import React from "react";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const Three = () => {
  const scene = new THREE.Scene(); //создаем сцену (осмнова)
  const camera = new THREE.PerspectiveCamera(75, 800 / 500, 0.1, 1000); //создаем камеру (основа)

  const renderer = new THREE.WebGLRenderer(); //создаем рендерер (основа)
  renderer.setSize(800, 500); //задаем размер рендереру
  renderer.setClearColor(0x000000, 0); //задаем бэкграунд нашему рендереру (бэкграунд канваса)
  document.body.appendChild(renderer.domElement); //добавляем элемент

  const controls = new OrbitControls(camera, renderer.domElement); //позволяем вращать нашу камеру

  //Настройка нашего элемента (в данном случае куба)
  const geometry = new THREE.BoxGeometry(30, 20, 1); //задаем геометрию нашему элементу
  const material = new THREE.MeshBasicMaterial({ color: "red" }); //задаем материал (в данном случае цвет)
  const cube = new THREE.Mesh(geometry, material); //присваиваем нашему элементу геометрию и материал

  scene.add(cube); //добавляем на нашу сцену куб

  cube.position.set(0, 0, 0); //pзадаем позицию нашему элементу
  camera.position.set(0, 20, 100); //задаем позицию камере

  function controlCameraOrbit() {
    //обновляем нашу камеру каждую секунду
    requestAnimationFrame(controlCameraOrbit);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update(); //апдейт нашей камеры

    renderer.render(scene, camera);
  }

  controlCameraOrbit();

  const setPositionEl = () => {
    //задаем позицию нашему элементу
    cube.position.x = 30;
    cube.position.y = -20;
    cube.position.z = 0;
    renderer.render(scene, camera);
  };

  const centerEl = () => {
    //центрируем наш элемент
    cube.position.set(0, 0, 0); //задаем позицию кубу
    camera.position.set(0, 20, 100); //задаем первоначальную позицию камере
    renderer.render(scene, camera);
  };

  renderer.render(scene, camera); //рендерим (делаем изображение на канваесе) нашу сцену с элементом и камеру

  return (
    <div className="renderer">
      <button className="btn" onClick={centerEl}>
        centerEl
      </button>
      <button className="btn" onClick={setPositionEl}>
        Move
      </button>
    </div>
  );
};

export default React.memo(Three);
