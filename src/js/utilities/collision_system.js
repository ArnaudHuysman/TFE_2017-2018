

import {GameObjects} from '../Game/utils';
//ElementCollisionEngine

export class CollisionEngine {

	constructor(){
		this.bodies = [];
	}

	testCollision(){
		for (var i = 0; i < this.bodies.length; i++) {
			const target = this.bodies[i];
			const targetBox  = new THREE.Box3().setFromObject(target.mesh);

			for (var j = 0; j < GameObjects.collidableMesh.length; j++) {
				const objCollide = GameObjects.collidableMesh[j];
				const collideBox = new THREE.Box3().setFromObject(objCollide.mesh);

				const collision = targetBox.intersectsBox(collideBox);

				if(collision) {
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
