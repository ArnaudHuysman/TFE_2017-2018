

import {GameObjects} from './utils';
//ElementCollisionEngine

export class CollisionEngine {

	constructor(){
		this.bodies = [];
	}

	testCollision(){

		for (var i = 0; i < this.bodies.length; i++) {
			let target = this.bodies[i];
			let targetBox  = new THREE.Box3().setFromObject(target.object);

			for (var j = 0; j < GameObjects.collidableMesh.length; j++) {
				let objCollide = GameObjects.collidableMesh[j];
				let collideBox = new THREE.Box3().setFromObject(objCollide.object);

				let collision = targetBox.intersectsBox(collideBox);

				if(collision) {
					console.log("Collision");
					this.bodies[i].collision = true;
					this.bodies[i].objectInCollision = objCollide;
					GameObjects.collidableMesh[j].collision = true;
				}
			}
		}
	}

	addBody(obj){
		this.bodies.push(obj);
	}

	removeBody(obj){
		let index = this.bodies.indexOf(obj);

		if (index >= 0)
		{
			this.bodies.splice(index,1);
		}
	}


}
