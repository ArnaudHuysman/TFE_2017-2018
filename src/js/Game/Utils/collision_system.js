

import {GameObjects} from './utils';
//ElementCollisionEngine

export class CollisionEngine {

	constructor(){
		this.bodies = {};
	}

	testCollision(arr1_str, arr2_str){
		if( this.bodies[arr1_str] && this.bodies[arr2_str] ){
			for (var i = 0; i < this.bodies[arr1_str].length; i++) {
				let target = this.bodies[arr1_str][i];
				let targetBox  = new THREE.Box3().setFromObject(target.object);

				for (var j = 0; j < this.bodies[arr2_str].length; j++) {
					let objCollide = this.bodies[arr2_str][j];
					let collideBox = new THREE.Box3().setFromObject(objCollide.object);

					let collision = targetBox.intersectsBox(collideBox);

					if(collision) {
						console.log(collision);
						this.bodies[arr1_str][i].collision = true;
						this.bodies[arr1_str][i].objectInCollision = objCollide;
						this.bodies[arr2_str][j].collision = true;
					}
				}
			}
		}
	}

	addBody(obj,array_str){
		if(!this.bodies[array_str]) this.bodies[array_str] = [];
		this.bodies[array_str].push(obj);
	}

	removeBody(obj,array_str){
		let index = this.bodies[array_str].indexOf(obj);

		if (index >= 0)
		{
			this.bodies[array_str].splice(index,1);
		}
	}
}
