// import * as THREE from 'three'
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
// import {useEffect} from "react";
// import model from './assets/box.glb';
// import model2 from './assets/box2.glb';
// import model3 from './assets/ice-cream.glb';
// import {GUI} from "dat.gui";
// import {GLTFLoader} from "three/addons";
//
// // CAMERA
// const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1500);
// camera.position.set(-35, 70, 100);
// camera.lookAt(new THREE.Vector3(0, 0, 0));
//
// // RENDERER
// const renderer = new THREE.WebGLRenderer({
//   antialias: true,
//   powerPreference: "high-performance",
//   precision: "highp"
// });
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.enabled = true;
// renderer.domElement.style.border = '10px solid black'
// renderer.domElement.style.display = 'block'
// renderer.domElement.style.boxSizing = 'border-box'
// if (!document.body.contains(renderer.domElement)) {
//   document.body.appendChild(renderer.domElement);
// }
//
//
// // WINDOW RESIZE HANDLING
// export function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }
//
// window.addEventListener('resize', onWindowResize);
//
// // SCENE
// const scene = new THREE.Scene()
// scene.background = new THREE.Color(0xbfd1e5);
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
//
// // CONTROLS
// const controls = new OrbitControls(camera, renderer.domElement);
//
// export function animate() {
//   dragObject()
//   renderer.render(scene, camera);
//   requestAnimationFrame(animate)
// }
//
// let hemiLight = new THREE.AmbientLight(0xffffff, 0.20);
// scene.add(hemiLight);
//
// //Add directional light
// let dirLight = new THREE.DirectionalLight(0xffffff, 1);
// dirLight.position.set(-30, 50, -30);
// scene.add(dirLight);
// dirLight.castShadow = true;
// dirLight.shadow.mapSize.width = 2048;
// dirLight.shadow.mapSize.height = 2048;
// dirLight.shadow.camera.left = -70;
// dirLight.shadow.camera.right = 70;
// dirLight.shadow.camera.top = 70;
// dirLight.shadow.camera.bottom = -70;
//
// function createFloor() {
//   let pos = {x: 0, y: -1, z: 3};
//   let scale = {x: 100, y: 2, z: 100};
//
//   let blockPlane = new THREE.Mesh(new THREE.BoxGeometry(),
//     new THREE.MeshStandardMaterial({color: 0xf9c834}));
//   blockPlane.position.set(pos.x, pos.y, pos.z);
//   blockPlane.scale.set(scale.x, scale.y, scale.z);
//   blockPlane.castShadow = true;
//   blockPlane.receiveShadow = true;
//   scene.add(blockPlane);
//
//   blockPlane.userData.ground = true
// }
//
// function createBox() {
//   let scale = {x: 6, y: 6, z: 6}
//   let pos = {x: 15, y: scale.y / 2, z: 15}
//
//   let box = new THREE.Mesh(new THREE.BoxGeometry(),
//     new THREE.MeshPhongMaterial({color: 0xDC143C}));
//   box.position.set(pos.x, pos.y, pos.z);
//   box.scale.set(scale.x, scale.y, scale.z);
//   box.castShadow = true;
//   box.receiveShadow = true;
//   scene.add(box)
//
//   box.userData.draggable = true
//   box.userData.name = 'BOX'
// }
//
// function createSphere() {
//   let radius = 4;
//   let pos = {x: 15, y: radius, z: -15};
//
//   let sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32),
//     new THREE.MeshStandardMaterial({color: 0x43a1f4}))
//   sphere.position.set(pos.x, pos.y, pos.z)
//   sphere.castShadow = true
//   sphere.receiveShadow = true
//
//   sphere.userData.draggable = true
//   sphere.userData.name = 'SPHERE'
//   scene.add(sphere)
// }
//
// const createModelFromBlender = (model) => {
//   const loader = new GLTFLoader();
//
//   loader.load(model, function (data) {
//
//     const item = data.scene.children[0]
//     item.position.x = -15
//     item.position.z = -15
//
//     item.castShadow = true
//     item.receiveShadow = true
//
//     item.userData.draggable = true
//     item.userData.name = 'blenderModel'
//     console.log(item)
//     scene.add(data.scene);
//
//   }, undefined, function (error) {
//
//     console.error(error);
//
//   });
// }
//
// function createCastle() {
//   const objLoader = new OBJLoader();
//
//   objLoader.loadAsync(model).then((group) => {
//     console.log(group.children[0])
//     const castle = group.children[0];
//
//     castle.position.x = -15
//     castle.position.z = -15
//     castle.position.z = 5
//
//     castle.scale.x = 5;
//     castle.scale.y = 5;
//     castle.scale.z = 5;
//
//     castle.castShadow = true
//     castle.receiveShadow = true
//
//     castle.userData.draggable = true
//     castle.userData.name = 'CASTLE'
//
//     scene.add(castle)
//   })
// }
//
// function createCylinder() {
//   let radius = 4;
//   let height = 6
//   let pos = {x: -15, y: height / 2, z: 15};
//
//   // threejs
//   let cylinder = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 32), new THREE.MeshStandardMaterial({color: 0x90ee90}))
//   cylinder.position.set(pos.x, pos.y, pos.z)
//   cylinder.castShadow = true
//   cylinder.receiveShadow = true
//   scene.add(cylinder)
//
//   cylinder.userData.draggable = true
//   cylinder.userData.name = 'CYLINDER'
// }
//
// const raycaster = new THREE.Raycaster()
// const clickMouse = new THREE.Vector2()
// const moveMouse = new THREE.Vector2()
// var draggable
//
// window.addEventListener('click', event => {
//   if (draggable != null) {
//     console.log(`dropping draggable ${draggable.userData.name}`)
//     draggable = null
//     return;
//   }
//
//   clickMouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
//   clickMouse.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;
//
//   raycaster.setFromCamera(clickMouse, camera)
//   const found = raycaster.intersectObjects(scene.children)
//   if (found.length > 0 && found[0].object.userData.draggable) {
//     draggable = found[0].object
//     console.log(`found draggable object ${draggable.userData.name}`)
//   }
// })
//
// window.addEventListener('mousemove', event => {
//   moveMouse.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
//   moveMouse.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;
// })
//
// function dragObject() {
//   if (draggable) {
//     raycaster.setFromCamera(moveMouse, camera)
//     const found = raycaster.intersectObjects(scene.children)
//     if (found.length > 0) {
//       for (const foundElement of found) {
//         if (!foundElement.object.userData.ground)
//           continue
//
//         draggable.position.x = foundElement.point.x
//         draggable.position.z = foundElement.point.z
//       }
//     }
//   }
// }
//
// // createModelFromBlender(model3)
// // createBox()
// // // createCastle()
// // createCylinder()
// // createSphere()
// // dragObject()
// // animate()
//
// const RaycasterDragDrop = () => {
//   // useEffect(() => {
//   //   createFloor()
//   // }, []);
//
//   return <div></div>
// }
//
// export default RaycasterDragDrop