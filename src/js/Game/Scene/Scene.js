export const SceneInfo = {
	fieldOfView : 0,
	aspectRatio : 0,
	nearPlane : 0,
	farPlane : 0,
	HEIGHT : 0,
	WIDTH : 0
}


export const scene = new THREE.Scene();


export class Scene {
	constructor() {

		this.camera;
		this.lights = [];
		this.pointLight = null;

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

		this.camera.position.z = 700;
		this.camera.position.y = -850;

		this.camera.lookAt( 0,0,-100 );

		var path = "dist/assets/img/textures/";
		var format = '.png';
		var urls = [
				path + 'px' + format, path + 'nx' + format,
				path + 'py' + format, path + 'ny' + format,
				path + 'pz' + format, path + 'nz' + format
			];
		var reflectionCube = new THREE.CubeTextureLoader().load( urls );
		reflectionCube.format = THREE.RGBFormat;
		var refractionCube = new THREE.CubeTextureLoader().load( urls );
		refractionCube.mapping = THREE.CubeRefractionMapping;
		refractionCube.format = THREE.RGBFormat;

		scene.background = reflectionCube;


		this.createLights(scene)
	}

	createLights(scene){
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
		directionalLight.position.set( 1, 1, 500 );

		var pointLight2 = new THREE.PointLight( 0x16D4F0, 2, 200, 2 );
		pointLight2.position.set( 0, 0, -100 );

		this.pointLight = new THREE.PointLight( 0xffffff, 2, 2000, 2 );
		this.pointLight.position.set( 0, 0, 800 );

		scene.add( directionalLight );
		// scene.add( helper );
		scene.add(this.pointLight);
		scene.add(pointLight2)

	}
}
