import * as THREE from 'three';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { renderSVG } from './svg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, -15);

RectAreaLightUniformsLib.init();

let renderer: THREE.WebGLRenderer;

const svg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.45516 17.8125C0.611161 17.8125 -0.0499323 18.5454 0.127056 19.3661C1.68415 26.5863 8.14777 32 15.8849 32C19.6192 32 23.0569 30.7389 25.7894 28.6222C26.7471 27.8804 26.1491 26.5 24.9351 26.5H5.34085C4.4717 26.5 3.76711 25.8004 3.76711 24.9375C3.76711 24.0746 4.4717 23.375 5.34085 23.375H29.3319C29.8591 23.375 30.3473 23.0856 30.5656 22.6083C31.4869 20.594 32 18.3565 32 16C32 13.5637 31.4515 11.2545 30.4705 9.18758C30.2484 8.71955 29.7653 8.4375 29.2449 8.4375H5.34085C4.4717 8.4375 3.76711 7.73795 3.76711 6.875C3.76711 6.01206 4.4717 5.3125 5.34085 5.3125H24.7028C25.9272 5.3125 26.5178 3.91567 25.5373 3.1864C22.8468 1.18532 19.5053 0 15.8849 0C7.95571 0 1.36404 5.68577 0.0202257 13.1749C-0.124941 13.9839 0.530974 14.6875 1.35731 14.6875H14.3112C15.1803 14.6875 15.8849 15.3871 15.8849 16.25C15.8849 17.1129 15.1803 17.8125 14.3112 17.8125H1.45516Z" fill="#F6417A"/>
</svg>
`;

const { object, update } = renderSVG(2, svg);

object.scale.set(0.1, 0.1, 0.1);
object.rotateX(Math.PI / 2);
object.rotateY(Math.PI);
object.position.set(0, 5, 0);
object.castShadow = true;

scene.add(object);

const geoFloor = new THREE.BoxGeometry(2000, 0.1, 2000);
const matStdFloor = new THREE.MeshStandardMaterial({
	color: 0x808080,
	roughness: 0.1,
	metalness: 0
});
const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
// scene.add(mshStdFloor);

const rectLight1 = new THREE.RectAreaLight(0x5f00ba, 5, 4, 10);
rectLight1.position.set(-5, 5, -7);
rectLight1.rotateY(-Math.PI / 2);
scene.add(rectLight1);

const rectLight2 = new THREE.RectAreaLight(0xff0054, 5, 4, 10);
rectLight2.position.set(0, 5, 5);
scene.add(rectLight2);

const rectLight3 = new THREE.RectAreaLight(0xff5400, 5, 4, 10);
rectLight3.position.set(5, 5, -2);
rectLight3.rotateY(Math.PI / 2);
scene.add(rectLight3);

const fog = new THREE.Fog(0x000000, 0, 100);
scene.fog = fog;

let spinVelocity = 0;

// Use of the Raycaster inspired by  webgl_interactive_cubes.html, in the THREE.js project examples directory
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mousedown', onDocumentMouseClick, false);

function onDocumentMouseMove(event: any) {
	event.preventDefault();
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function manageRaycasterIntersections(scene: any, camera: any) {
	camera.updateMatrixWorld();
	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children);

	if (intersects.length > 0) {
		spinVelocity = 0.1;
		console.log('hello');
	} else {
		console.log('no intersection');
	}
}

function onDocumentMouseClick(event: any) {
	manageRaycasterIntersections(scene, camera);
}

const animate = () => {
	requestAnimationFrame(animate);

	object.rotation.y += spinVelocity;
	if (spinVelocity > 0.01) {
		spinVelocity -= 0.001;
	}
	// object.rotation.x += objectXDir * 0.01;

	// camera.position.x = Math.sin(Date.now() / 1000) * 10;
	// camera.position.z = Math.cos(Date.now() / 1000) * 10;
	camera.lookAt(0, 0, 0);

	renderer.render(scene, camera);
};

const resize = () => {
	// renderer.setSize(window.innerWidth, window.innerHeight);
	// camera.aspect = window.innerWidth / window.innerHeight;
	renderer.setSize(350, 350);
	camera.aspect = 1;
	camera.updateProjectionMatrix();
};

export const createScene = (el: HTMLCanvasElement) => {
	renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el, alpha: true });
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.outputEncoding = THREE.sRGBEncoding;

	resize();
	animate();
};

window.addEventListener('resize', resize);
