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

		this.camera;
		this.scene = new THREE.Scene();
		this.lights = [];
		this.pointLight = null;
		this.loaded = false;
	}

	generateScene(){

		//this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

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

		this.camera.position.z = 2000;
		this.camera.position.y = -2050;

		this.camera.lookAt( 0,0, -50 );

		this.createLights();

		var path = "dist/assets/img/textures/";
		var format = '.png';
		var urls = [
				path + 'px' + format, path + 'nx' + format,
				path + 'py' + format, path + 'ny' + format,
				path + 'pz' + format, path + 'nz' + format
			];

		let self = this;
		var refractionCube = new THREE.CubeTextureLoader().load( urls, function(){
			refractionCube.mapping = THREE.CubeRefractionMapping;
			refractionCube.format = THREE.RGBFormat;
			self.scene.background = refractionCube;
			self.loaded = true;
		});


	}

	createLights(){
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
		directionalLight.position.set( 1, 1, 500 );

		var pointLight2 = new THREE.PointLight( 0x16D4F0, 2, 200, 2 );
		pointLight2.position.set( 0, 0, -100 );

		this.pointLight = new THREE.PointLight( 0xffffff, 2, 2000, 2 );
		this.pointLight.position.set( 0, 0, 800 );

		this.scene.add( directionalLight );
		// this.scene.add( helper );
		this.scene.add(this.pointLight);
		this.scene.add(pointLight2)

	}
}
