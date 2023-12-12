import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {GUI} from "dat.gui";
import gsap from 'gsap'
import {log} from "three/nodes";
import {useEffect} from "react";

const Camera = () => {
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
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000.0
  );
  camera.position.set(20, 20, 0);

  const scene = new THREE.Scene();

  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, Math.PI)
  light.intensity = 6.28
  light.castShadow = true
  light.shadow.mapSize.width = 512
  light.shadow.mapSize.height = 512
  light.shadow.camera.near = 0.5
  light.shadow.camera.far = 100
  light.position.set(24.33, 11.11, 19.9)
  scene.add(light)

  // const helper = new THREE.DirectionalLightHelper(light);
  const helper = new THREE.CameraHelper(light.shadow.camera)
  scene.add(helper)
  scene.add(new THREE.AxesHelper(5))

  // light = new THREE.AmbientLight(0x101010);
  // scene.add(light);

  const planeGeometry = new THREE.PlaneGeometry(20, 20);
  const planeMaterial = new THREE.MeshPhongMaterial();
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  plane.castShadow = true;
  scene.add(plane);

  const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    }))
  box.position.set(0, 1, 0);
  box.castShadow = true;
  box.receiveShadow = true;
  scene.add(box);

  const edgesGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(2, 2, 2));
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: "black",
    linewidth: 2,
  });
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  box.add(edges);

  const data = {
    color: light.color.getHex(),
    mapsEnabled: true,
    shadowMapSizeWidth: 512,
    shadowMapSizeHeight: 512,
  }

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };


  const handler = () => {
    gsap.to(controls.target, {
      duration: 2,
      x: 0,
      y: 0,
      z: 0,
    })
    gsap.to(camera.position, {
      duration: 2,
      x: 20,
      y: 5,
      z: 0,
      onUpdate: () => controls.update(),
    })
    // //анимация step by step (delay - через сколько секунд сработает анимация)
    //  gsap.to(camera.position, {
    //    duration: 2,
    //    x: 20,
    //    y: 60,
    //    z: 0,
    //    delay: 2,
    //    onUpdate: () => controls.update(),
    //  })
  }

  useEffect(() => {
    handler()
  }, []);

  animate();
  return <div>
    <button className="btn" onClick={handler}>
      Reset
    </button>
  </div>
}

export default Camera