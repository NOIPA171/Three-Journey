import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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

// Fullscreen
const handleFullScreen = () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  } else {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  }
};

window.addEventListener("dblclick", handleFullScreen);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = false;
controls.enableDamping = true;

// Clock
const tick = () => {
  controls.update();
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
