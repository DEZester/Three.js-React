import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";

const SmoothCameraAnimation = () => {
  // Создание сцены
  const scene = new THREE.Scene();

  // Создание камеры
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 5);

  // Создание рендерера
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(1300, 800);
  document.body.appendChild(renderer.domElement);

  // Создание сферы для визуализации движения камеры
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

  // Создание точки, к которой камера будет двигаться
  const target = new THREE.Vector3(0, 0, 0);

  // Анимация перехода камеры к новой позиции
  const animationDuration = 2000; // В миллисекундах
  const cameraStartPosition = camera.position.clone(); // Копирование начальной позиции камеры
  const cameraTargetPosition = target.clone(); // Копирование конечной позиции камеры
  const cameraStartLookAt = camera.getWorldDirection(new THREE.Vector3()); // Получение начального направления взгляда камеры
  const cameraTargetLookAt = cameraTargetPosition
    .clone()
    .sub(cameraStartPosition)
    .normalize(); // Вычисление конечного направления взгляда камеры

  let animationStartTime = null;

  function animate(time) {
    if (!animationStartTime) {
      animationStartTime = time;
    }

    const elapsedTime = time - animationStartTime;
    const animationProgress = Math.min(elapsedTime / animationDuration, 1); // Ограничение прогресса анимации до 1
    const animationEasing = TWEEN.Easing.Quadratic.Out(animationProgress); // Квадратичное сглаживание анимации

    // Вычисление позиции камеры и направления взгляда на каждом шаге анимации
    const cameraPosition = cameraStartPosition
      .clone()
      .lerp(cameraTargetPosition, animationEasing);
    const cameraLookAt = cameraStartLookAt
      .clone()
      .lerp(cameraTargetLookAt, animationEasing)
      .normalize();

    camera.position.copy(cameraPosition);
    camera.lookAt(cameraPosition.clone().add(cameraLookAt));

    // Обновление позиции сферы для визуализации движения камеры
    sphere.position.copy(cameraPosition);

    if (animationProgress < 1) {
      requestAnimationFrame(animate);
    }
    renderer.render(scene, camera);
  }

  // Запуск анимации
  animate();

  // Использование библиотеки TWEEN для плавного перехода камеры к новой позиции
  new TWEEN.Tween(camera.position)
    .to(cameraTargetPosition, animationDuration)
    .easing(TWEEN.Easing.Quadratic.Out)
    .start();
  new TWEEN.Tween(camera.lookAt).to(cameraTargetLookAt, animationDuration);

  return (
    <div>
      <button className="btn">Return Camera</button>
    </div>
  );
};

export default SmoothCameraAnimation;
