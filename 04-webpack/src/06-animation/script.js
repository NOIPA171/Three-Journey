import * as THREE from "three";
import gsap from "gsap";
import "./style.css";

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Axes helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height); // FOV, aspect ratio
camera.position.z = 3;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

// let time = Date.now();
// const tick = () => {
//   renderer.render(scene, camera);
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   time = currentTime;
//   mesh.rotation.y += 0.001 * deltaTime;
//   window.requestAnimationFrame(tick);
// };
// tick();

// Clock
// const clock = new THREE.Clock();
// const tick = () => {
//   // don't use getDelta(), will cause issues
//   const elapsedTime = clock.getElapsedTime();
//   // mesh.rotation.y = elapsedTime;
//   camera.position.y = Math.sin(elapsedTime);
//   camera.position.x = Math.cos(elapsedTime);
//   camera.lookAt(mesh.position);
//   // one circle per second
//   // mesh.rotation.y = elapsedTime * Math.PI * 2;
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

// GSAP
gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });
gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 });
const tick = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
