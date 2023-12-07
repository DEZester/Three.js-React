import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {GUI} from "dat.gui";
import gsap from 'gsap'

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
  camera.position.set(20, 5, 0);

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

  const gui = new GUI()
  const lightFolder = gui.addFolder('THREE.Light')
  lightFolder.addColor(data, 'color').onChange(() => {
    light.color.setHex(Number(data.color.toString().replace('#', '0x')))
  })
  lightFolder.add(light, 'intensity', 0, Math.PI * 2, 0.01)

  const directionalLightFolder = gui.addFolder('THREE.DirectionalLight')
  directionalLightFolder
    .add(light.shadow.camera, 'left', -10, -1, 0.1)
    .onChange(() => light.shadow.camera.updateProjectionMatrix())
  directionalLightFolder
    .add(light.shadow.camera, 'right', 1, 10, 0.1)
    .onChange(() => light.shadow.camera.updateProjectionMatrix())
  directionalLightFolder
    .add(light.shadow.camera, 'top', 1, 10, 0.1)
    .onChange(() => light.shadow.camera.updateProjectionMatrix())
  directionalLightFolder
    .add(light.shadow.camera, 'bottom', -10, -1, 0.1)
    .onChange(() => light.shadow.camera.updateProjectionMatrix())
  directionalLightFolder
    .add(light.shadow.camera, 'near', 0.1, 100)
    .onChange(() => light.shadow.camera.updateProjectionMatrix())
  directionalLightFolder
    .add(light.shadow.camera, 'far', 0.1, 100)
    .onChange(() => light.shadow.camera.updateProjectionMatrix())
  directionalLightFolder
    .add(data, 'shadowMapSizeWidth', [256, 512, 1024, 2048, 4096])
    .onChange(() => updateShadowMapSize())
  directionalLightFolder
    .add(data, 'shadowMapSizeHeight', [256, 512, 1024, 2048, 4096])
    .onChange(() => updateShadowMapSize())
  directionalLightFolder.add(light.position, 'x', -50, 50, 0.01)
  directionalLightFolder.add(light.position, 'y', -50, 50, 0.01)
  directionalLightFolder.add(light.position, 'z', -50, 50, 0.01)
  directionalLightFolder.open()

  function updateShadowMapSize() {
    light.shadow.mapSize.width = data.shadowMapSizeWidth
    light.shadow.mapSize.height = data.shadowMapSizeHeight;
  }


  gsap.to(controls.target,
    {x: camera.position.x, y: camera.position.y, z: camera.position.z, duration: 2, ease: 'power3. inOut'})
  gsap.to(camera.position,
    {x: camera.position.x, y: camera.position.y + 3, z: camera.position.z, ease: 'power3. inOut',}, "-=2")


  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
  return <div></div>
}

export default Camera