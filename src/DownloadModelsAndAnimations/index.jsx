import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {useEffect} from "react";
import {GUI} from "dat.gui";
import {GLTFLoader} from "three/addons";
import cube from './assets/weirdCube.glb';

const DownloadModels = () => {

// CAMERA
  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
  camera.position.set(-35, 70, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

// RENDERER
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
    precision: "highp"
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.boxSizing = 'border-box'
  if (!document.body.contains(renderer.domElement)) {
    document.body.appendChild(renderer.domElement);
  }


// WINDOW RESIZE HANDLING
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize);

// SCENE
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xbfd1e5);
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

// CONTROLS
  const controls = new OrbitControls(camera, renderer.domElement);


  let hemiLight = new THREE.AmbientLight(0xffffff, 0.20);
  scene.add(hemiLight);

  function createFloor() {
    let pos = {x: 0, y: -1, z: 3};
    let scale = {x: 100, y: 2, z: 100};

    let blockPlane = new THREE.Mesh(new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial({color: 0xf9c834}));
    blockPlane.position.set(pos.x, pos.y, pos.z);
    blockPlane.scale.set(scale.x, scale.y, scale.z);
    blockPlane.castShadow = true;
    blockPlane.receiveShadow = true;
    scene.add(blockPlane);

    blockPlane.userData.ground = true
  }

  let mixer
  let action
  const createModelFromBlender = (model) => {
    const loader = new GLTFLoader();

    loader.load(model, function (data) {
      // console.log(data)
      const item = data.scene
      item.castShadow = true
      item.receiveShadow = true
      // item.position.z = 15
      item.position.y = 3
      item.scale.set(3, 3, 3)
      // item.position.z = 15
      item.children[0].userData.draggable = true
      item.children[0].userData.name = 'blenderModel'
      // // console.log(item)
      scene.add(item);
      mixer = new THREE.AnimationMixer(item)
      const clips = data.animations
      const clip = THREE.AnimationClip.findByName(clips, 'SecondAnimation')
      action = mixer.clipAction(clip)

    }, undefined, function (error) {

      console.error(error);

    });
  }

  const raycaster = new THREE.Raycaster()
  const clickMouse = new THREE.Vector2()
  const moveMouse = new THREE.Vector2()
  var draggable

  window.addEventListener('click', event => {
    if (draggable != null) {
      console.log(`dropping draggable ${draggable.userData.name}`)
      draggable = null
      return;
    }

    clickMouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
    clickMouse.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(clickMouse, camera)
    const found = raycaster.intersectObjects(scene.children)
    if (found.length > 0 && found[0].object.userData.draggable) {
      draggable = found[0].object
      console.log(`found draggable object ${draggable.userData.name}`)
    }
  })

  window.addEventListener('mousemove', event => {
    moveMouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
    moveMouse.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;
  })

  function dragObject() {
    if (draggable) {
      raycaster.setFromCamera(moveMouse, camera)
      const found = raycaster.intersectObjects(scene.children)
      if (found.length > 0) {
        for (const foundElement of found) {
          if (!foundElement.object.userData.ground)
            continue

          draggable.position.x = foundElement.point.x
          draggable.position.z = foundElement.point.z
        }
      }
    }
  }

  const clock = new THREE.Clock()

  window.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key === 'ArrowUp') {
      console.log(action)
      action.play()
    } else {
      action.stop()
    }
  })

  function animate() {
    mixer?.update(clock.getDelta())
    dragObject()
    renderer.render(scene, camera);
    requestAnimationFrame(animate)
  }

  createModelFromBlender(cube)
  createFloor()
  dragObject()
  animate()


  return <div></div>
}

export default DownloadModels