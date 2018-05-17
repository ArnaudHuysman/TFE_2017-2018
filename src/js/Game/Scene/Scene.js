export const SceneInfo = {
	fieldOfView : 0,
	aspectRatio : 0,
	nearPlane : 0,
	farPlane : 0,
	HEIGHT : 0,
	WIDTH : 0
}
export class Scene {
	constructor() {

		this.scene = new THREE.Scene();
		this.camera;
		this.lights = [];

	}

	generateScene(scene,map){

		//scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

		SceneInfo.HEIGHT = window.innerHeight;
	  SceneInfo.WIDTH = window.innerWidth;


		SceneInfo.aspectRatio = SceneInfo.WIDTH/SceneInfo.HEIGHT;
		SceneInfo.fieldOfView = 30;
		SceneInfo.nearPlane = 1;
		SceneInfo.farPlane = 10000;

		this.camera =  new THREE.PerspectiveCamera(
	    SceneInfo.fieldOfView,
	    SceneInfo.aspectRatio,
	    SceneInfo.nearPlane,
	    SceneInfo.farPlane
	  );

		this.camera.position.z = 1000;
		this.camera.position.y = -850;

		this.camera.lookAt(0,0,0);

		this.createLights(scene)
	}

	createLights(scene){
		let light = new THREE.PointLight(0xffffff)
		light.position.set(0,-1000,1000);
		this.lights.push(light);
		scene.add(light);
	}
}
