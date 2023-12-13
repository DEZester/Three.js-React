import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {GUI} from "dat.gui";
import gsap from 'gsap'
import {useEffect} from "react";
import {SVGRenderer} from 'three/examples/jsm/renderers/SVGRenderer'
import {log} from "three/nodes";

var cloneDeep = require('lodash.clonedeep');

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
  renderer.setSize(1300, 768);
  renderer.domElement.style.margin = "20px auto";
  const camera = new THREE.PerspectiveCamera(
    45,
    1300 / 768,
    1,
    1000
  );
  camera.position.set(0, 0, 12);

  const scene = new THREE.Scene();

  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const addNewBoxMesh = (x, y, z) => {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshBasicMaterial({color: 'black'});
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.set(x, y, z);

    scene.add(boxMesh);

    const edges = new THREE.EdgesGeometry(boxMesh.geometry);
    const edgeLines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xfffff}));
    edgeLines.raycast = function () {
    };//скрываем эти элементы от raycast
    boxMesh.add(edgeLines)

  };

  // top rows
  addNewBoxMesh(0, 2, 0);
  addNewBoxMesh(2, 2, 0);
  addNewBoxMesh(-2, 2, 0);
  addNewBoxMesh(0, 2, -2);
  addNewBoxMesh(2, 2, -2);
  addNewBoxMesh(-2, 2, -2);
  addNewBoxMesh(0, 2, 2);
  addNewBoxMesh(2, 2, 2);
  addNewBoxMesh(-2, 2, 2);

  // middle rows
  addNewBoxMesh(0, 0, 0);
  addNewBoxMesh(2, 0, 0);
  addNewBoxMesh(-2, 0, 0);
  addNewBoxMesh(0, 0, -2);
  addNewBoxMesh(2, 0, -2);
  addNewBoxMesh(-2, 0, -2);
  addNewBoxMesh(0, 0, 2);
  addNewBoxMesh(2, 0, 2);
  addNewBoxMesh(-2, 0, 2);

  // bottom rows
  addNewBoxMesh(0, -2, 0);
  addNewBoxMesh(2, -2, 0);
  addNewBoxMesh(-2, -2, 0);
  addNewBoxMesh(0, -2, -2);
  addNewBoxMesh(2, -2, -2);
  addNewBoxMesh(-2, -2, -2);
  addNewBoxMesh(0, -2, 2);
  addNewBoxMesh(2, -2, 2);
  addNewBoxMesh(-2, -2, 2);


  const raycaster = new THREE.Raycaster();
  let pointer = {x: 0, y: 0};

  let intersects = [];
  //определяет точки
  window.addEventListener('mousemove', event => {
    pointer.x = ((event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.clientWidth) * 2 - 1;
    pointer.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    intersects = raycaster.intersectObjects(scene.children);
  });

  //по двойному клику меняет цвет элемента
  window.addEventListener('dblclick', _ => {
    if (intersects.length > 0) {
      if (intersects[0].object.material.color.getHex() === 0xffff00) {
        intersects[0].object.material.color.set('black');
        return;
      }
      intersects[0].object.material.color.set('yellow');
      scene.children.filter(child => child.uuid !== intersects[0].object.uuid).forEach(el => {
        el.material.color.set('black');
      })
    }
  });
//test
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
    {/*<button className="btn" onClick={handler}>*/}
    {/*  Reset*/}
    {/*</button>*/}
  </div>
}

export default GetPointsOnScene