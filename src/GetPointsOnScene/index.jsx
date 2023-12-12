import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {GUI} from "dat.gui";
import gsap from 'gsap'
import {useEffect} from "react";
import {SVGRenderer} from 'three/examples/jsm/renderers/SVGRenderer'

const GetPointsOnScene = () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
    precision: "highp"
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor("#cbdaf2");
  renderer.setSize(1300, 800);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000.0
  );
  camera.position.set(1, 0, 0);

  const scene = new THREE.Scene();

  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // for (let i = 1; i < 3; i++) {
  //   const box = new THREE.Mesh(
  //     new THREE.BoxGeometry(2, 2, 2),
  //     new THREE.MeshBasicMaterial({
  //       color: 0x00ff00,
  //     }))
  //   if (i === 1) {
  //
  //     box.position.set(0, 1, -8);
  //   } else {
  //     box.position.set(0, 1, 8);
  //
  //   }
  //   const edgesGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2));
  //   const edgesMaterial = new THREE.LineBasicMaterial({
  //     color: "black",
  //     linewidth: 2,
  //   });
  //   box.name = `box-${i}`
  //   const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  //   box.add(edges);
  //   // box.castShadow = true;
  //   box.receiveShadow = true;
  //   scene.add(box);
  // }

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({color: 0x0077ff});
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const interactiveMeshes = [] // Массив для хранения всех интерактивных элементов

// Когда вы создаёте Меш и добавляете его в сцену:
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);
  interactiveMeshes.push(box) // Добавляем меш в массив интерактивных объектов

  function onMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // get array of objects that intersects with ray
    const intersects = raycaster.intersectObjects(interactiveMeshes); // Используем массив интерактивных объектов

    if (intersects.length > 0) {
      for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color = new THREE.Color(Math.random() * 0xffffff);
      }
    }
  }

  const arr = scene.children.filter(el => el.name.split('-').includes('box'))
  console.log(box)

  window.addEventListener('click', onMouseClick, false);

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  const handler = () => {
    const renderer = new SVGRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  }

  animate();
  return <div>
    <button className="btn" onClick={handler}>
      Reset
    </button>
  </div>
}

export default GetPointsOnScene