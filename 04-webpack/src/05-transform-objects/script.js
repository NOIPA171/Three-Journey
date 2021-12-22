import * as THREE from "three";
import "./style.css";

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

const group = new THREE.Group();
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -2;
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;
group.add(cube1);
group.add(cube2);
group.add(cube3);

group.position.y = 1;

scene.add(group);

// Position
mesh.position.set(0.7, -0.6, 1);
// scene.add(mesh);
console.log("length:", mesh.position.length());
mesh.position.normalize();
console.log("length after normalize:", mesh.position.length());

// Scale
// mesh.scale.x = 1.2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 0.5);

// Rotation
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;

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
// camera.position.x = 1;
// camera.position.y = 1;
scene.add(camera);

console.log("distance to camera:", mesh.position.distanceTo(camera.position));

// Look at
// camera.lookAt(new THREE.Vector3(3, 0, 0));
// camera.lookAt(mesh.position);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
