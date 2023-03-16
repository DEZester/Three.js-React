import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const PlaneAndBox = () => {
  // Создаем сцену, камеру и рендерер
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Создаем плоскость
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x808080,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2; // Повернем плоскость на 90 градусов по оси X, чтобы она была горизонтальной
  scene.add(plane);

  // Создаем кубик
  const cubeGeometry = new THREE.BoxGeometry();
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.y = 0.5; // Помещаем кубик на плоскость
  const initialCubePosition = cube.position.clone(); // Сохраняем начальную позицию кубика
  scene.add(cube);

  //область победы
  const winGeometry = new THREE.PlaneGeometry(1, 1);
  const winMaterial = new THREE.MeshBasicMaterial({
    color: "yellow",
    side: THREE.DoubleSide,
  });
  const win = new THREE.Mesh(winGeometry, winMaterial);
  win.rotation.x = -Math.PI / 2;
  win.position.x = 4.3;
  win.position.z = -2.5;
  win.position.y = 0.1;
  scene.add(win);
  // Перемещаем камеру, чтобы она смотрела на сцену
  camera.position.z = 8;
  camera.position.y = 4.34;
  const initialCameraPosition = camera.position.clone();
  //   const cameraDistance = 5;
  //   camera.position.set(cube.position.x, cameraDistance, cube.position.z);
  //   function updateCameraPosition() {
  //     camera.position.set(cube.position.x, cameraDistance, cube.position.z);
  //     camera.lookAt(cube.position);
  //   }
  // Добавляем управление камерой с помощью мыши
  const controls = new OrbitControls(camera, renderer.domElement);

  // Добавляем управление перемещением кубика
  const cubeSpeed = 0.1;
  const moveLeft = () => {
    cube.position.x -= cubeSpeed;
  };
  const moveRight = () => {
    cube.position.x += cubeSpeed;
  };
  const moveUp = () => {
    cube.position.z -= cubeSpeed;
  };
  const moveDown = () => {
    cube.position.z += cubeSpeed;
  };

  // Обновляем сцену
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    // console.log("cube= " + cube.position.z);
    // console.log("win= " + win.position.z);
    // console.log(cube.position.z.toFixed());
    // console.log("cubeX= " + cube.position.x);
    // console.log("cubeZ= " + cube.position.z);
    if (
      cube.position.x === 4.300000000000001 &&
      cube.position.z === -2.500000000000001
    ) {
      console.log("WINING");
    }
  }
  animate();

  //   updateCameraPosition();
  // Обрабатываем нажатия клавиш для управления перемещением кубика
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowDown":
        moveDown();
        break;
    }
  });

  // Добавляем кнопку для возврата кубика на исходное место
  const handleClick = () => {
    cube.position.copy(initialCubePosition); // Возвращаем кубик на исходное место
    camera.position.copy(initialCameraPosition); //
  };

  return (
    <div>
      <button className="btn" onClick={handleClick}>
        Reset
      </button>
    </div>
  );
};

export default PlaneAndBox;
