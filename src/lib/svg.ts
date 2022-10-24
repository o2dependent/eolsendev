import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

const fillMaterial = new THREE.MeshStandardMaterial({
	color: '#F3FBFB',
	roughness: 0.5,
	metalness: 0.5
});
const stokeMaterial = new THREE.LineBasicMaterial({
	color: '#F3FBFB',
	linewidth: 0
});
const renderSVG = (extrusion: any, svg: any) => {
	const loader = new SVGLoader();
	const svgData = loader.parse(svg);
	const svgGroup = new THREE.Group();
	const updateMap: any[] = [];

	svgGroup.scale.y *= -1;
	svgData.paths.forEach((path) => {
		const shapes = SVGLoader.createShapes(path);

		shapes.forEach((shape) => {
			const meshGeometry = new THREE.ExtrudeGeometry(shape, {
				depth: extrusion,
				bevelEnabled: false
			});
			const linesGeometry = new THREE.EdgesGeometry(meshGeometry);
			const mesh = new THREE.Mesh(meshGeometry, fillMaterial);
			// const lines = new THREE.LineSegments(linesGeometry, stokeMaterial);

			updateMap.push({ shape, mesh });
			svgGroup.add(mesh);
		});
	});

	const box = new THREE.Box3().setFromObject(svgGroup);
	const size = box.getSize(new THREE.Vector3());
	const yOffset = size.y / -2;
	const xOffset = size.x / -2;

	svgGroup.children.forEach((item) => {
		item.position.x = xOffset;
		item.position.y = yOffset;
	});
	svgGroup.rotateX(-Math.PI / 2);

	return {
		object: svgGroup,
		update(extrusion: any) {
			updateMap.forEach((updateDetails) => {
				const meshGeometry = new THREE.ExtrudeGeometry(updateDetails.shape, {
					depth: extrusion,
					bevelEnabled: false
				});
				const linesGeometry = new THREE.EdgesGeometry(meshGeometry);

				updateDetails.mesh.geometry.dispose();
				updateDetails.lines.geometry.dispose();
				updateDetails.mesh.geometry = meshGeometry;
				updateDetails.lines.geometry = linesGeometry;
			});
		}
	};
};
export { renderSVG };
