var fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH;

class Scene {
	constructor() {

		this.scene = new THREE.Scene();
		this.camera;
		this.lights = [];

	}

	generateScene(){

		//scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

		HEIGHT = window.innerHeight;
	  WIDTH = window.innerWidth;


		aspectRatio = WIDTH/HEIGHT;
		fieldOfView = 30;
		nearPlane = 1;
		farPlane = 10000;

		this.camera =  new THREE.PerspectiveCamera(
	    fieldOfView,
	    aspectRatio,
	    nearPlane,
	    farPlane
	  );

		this.camera.position.z = 500 ;
		this.camera.position.y = -850;

		//camera.rotation.x = -0.85;

		this.camera.lookAt(new THREE.Vector3(0,0,0));

		this.createLights()
	}

	createLights(){
		let light = new THREE.PointLight(0xffffff)
		light.position.set(0,-1000,1000);
		this.lights.push(light);
		scene.add(light);
	}


}
