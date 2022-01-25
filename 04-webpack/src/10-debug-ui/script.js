import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import gsap from "gsap";

import "./style.css";

// Debug
const gui = new GUI({ closed: true, width: 400 });
const debugObject = {
  color: 0xff0000,
  spin: () => gsap.to(mesh.rotation, { y: mesh.rotation.y + 10, duration: 1 }),
};

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// Debug
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("red cube Y");
gui.add(mesh, "visible");
gui.add(material, "wireframe");

gui.addColor(debugObject, "color").onChange((evt) => {
  material.color.set(evt);
});

gui.add(debugObject, "spin");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // FOV
  sizes.width / sizes.height, // aspect ratio
  0.1, // near plane
  100 // far plane
);

camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Resize
const updateSizes = () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // update camera
  camera.aspect = sizes.width / sizes.height;
  // update matrix as well
  camera.updateProjectionMatrix();
  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

window.addEventListener("resize", updateSizes);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Clock
const tick = () => {
  controls.update();
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
