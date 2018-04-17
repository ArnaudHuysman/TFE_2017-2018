


//ElementCollisionEngine

class CollisionEngine {

	constructor(){
		this.bodies = [];
	}

	testCollision(){
		for (var i = 0; i < this.bodies.length; i++) {
			const target = this.bodies[i];
			const targetBox  = new THREE.Box3().setFromObject(target.mesh);

			for (var j = 0; j < Game.collidableMesh.length; j++) {
				const bullet = Game.collidableMesh[j];
				const bulletBox = new THREE.Box3().setFromObject(bullet.mesh);

				const collision = targetBox.intersectsBox(bulletBox);

				if(collision) {
					this.bodies[i].collision = true;
					this.bodies[i].objectInCollision = Game.collidableMesh[j];
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