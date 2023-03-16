import * as THREE from "three";
import React from "react";

const Three = () => {
  const scene = new THREE.Scene(); //создаем сцену (осмнова)
  const camera = new THREE.PerspectiveCamera(75, 800 / 500, 0.1, 1000); //создаем камеру (основа)

  const renderer = new THREE.WebGLRenderer(); //создаем рендерер (основа)
  renderer.setSize(800, 500); //задаем размер рендереру
  renderer.setClearColor(0x000000, 0); //задаем бэкграунд нашему рендереру (бэкграунд канваса)
  document.body.appendChild(renderer.domElement); //добавляем элемент

  //Настройка нашего элемента (в данном случае куба)
  const geometry = new THREE.BoxGeometry(3, 2, 1); //задаем геометрию нашему элементу
  const material = new THREE.MeshBasicMaterial({ color: "red" }); //задаем материал (в данном случае цвет)
  const cube = new THREE.Mesh(geometry, material); //присваиваем нашему элементу геометрию и материал

  scene.add(cube); //добавляем на нашу сцену куб

  cube.position.set(0, 0, 0); //pзадаем позицию нашему элементу

  camera.position.z = 10; //задаем позицию камере
  //   camera.position.x = 5;
  //   camera.position.y = 0;

  function animate() {
    //анимация вращения
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  //   animate();

  const setPositionEl = () => {
    //задаем позицию нашему элементу
    cube.position.x = 3;
    cube.position.y = 2;
    cube.position.z = 0;
    renderer.render(scene, camera);
  };

  const centerEl = () => {
    //центрируем наш элемент
    cube.position.set(0, 0, 0);
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
