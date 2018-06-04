export const SceneInfo = {
	fieldOfView : 0,
	aspectRatio : 0,
	nearPlane : 0,
	farPlane : 0,
	HEIGHT : 0,
	WIDTH : 0
}


export const scene = new THREE.Scene();


export class ScreenScene {
	constructor(container) {

		this.container = container;
		this.camera;
		this.scene = new THREE.Scene();
		this.lights = [];
		this.pointLight = null;

	}

	generateScene(scene,map){

		//scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);


		SceneInfo.HEIGHT = this.container.clientHeight;
	  SceneInfo.WIDTH = this.container.clientWidth;


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

		this.camera.position.z = 100;
		this.camera.position.y = 20;

		this.camera.lookAt( 0,5,0 );

		this.createLights(scene)
	}

	createLights(scene){
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
		directionalLight.position.set( 1, 1, 1 );

		var pointLight2 = new THREE.PointLight( 0x16D4F0, 2, 200, 2 );
		pointLight2.position.set( 0, 0, -100 );

		scene.add( directionalLight );
		scene.add(pointLight2)

	}
}
