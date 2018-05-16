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

	generateScene(scene){

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

		this.camera.position.x = 0;
		this.camera.position.z = 500;
		this.camera.position.y = 0;

		this.camera.rotation.x = (Math.PI/180)*90;
		//camera.rotation.x = -0.85;

		//this.camera.lookAt(new THREE.Vector3(0,0,0));

		this.createLights(scene)
	}

	createLights(scene){
		let light = new THREE.PointLight(0xffffff)
		light.position.set(0,-1000,1000);
		this.lights.push(light);
		scene.add(light);
	}
}
