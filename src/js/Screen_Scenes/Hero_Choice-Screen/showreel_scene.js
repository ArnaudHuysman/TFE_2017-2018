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
	constructor(container, map) {

		this.map = map;
		this.container = container;
		this.camera;
		this.scene = new THREE.Scene();
		this.lights = [];
		this.pointLight = null;

	}

	generateScene(map){

		//scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);


		SceneInfo.HEIGHT = this.container.offsetHeight;
	  SceneInfo.WIDTH = this.container.offsetWidth;


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
		this.camera.position.y = -1000;

		this.camera.lookAt( 0,5,0 );

		this.createLights()
	}

	createLights(){
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
		directionalLight.position.set( 1, 1, 500 );

		var pointLight2 = new THREE.PointLight( this.map.colors.ressource, 2, 200, 2 );
		pointLight2.position.set( 0, 0, -100 );

		this.pointLight = new THREE.PointLight( 0xffffff, 1, 2000, 2 );
		this.pointLight.position.set( 0, 0, 800 );

		this.scene.add( directionalLight );
		// this.scene.add( helper );
		this.scene.add(this.pointLight);
		this.scene.add(pointLight2)

	}
}
