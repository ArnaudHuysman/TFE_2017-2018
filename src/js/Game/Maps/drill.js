class DrillPart extends Bodypart {
  constructor(width, height, depth, color, name){
    super(width, height, depth, color, name)
  }
}

class Drill {
  constructor(){
    this.object  = new THREE.Object3D();

    this.support = new DrillPart(20,5,20,0xd90368,"support");
    this.object.add(this.support.mesh);

    this.main = new DrillPart(5,30,5,0x0a2444,"main");
    this.main.mesh.position.set(0,0,5);
    this.object.add(this.main.mesh);
    console.log(gameTime)
    this.diff = 30/(gameTime*60);
  }

  animate(){

    if(this.main.mesh.position.z > -10) {
      this.main.mesh.rotation.z += 0.05;
      this.main.mesh.position.z -= this.diff;
    }

  }
}


const drill = new Drill();

drill.object.scale.set(2,2,2);
drill.object.position.set(0,0,5);
drill.object.rotation.z = Math.PI / 4;
drill.object.translateY(50);
drill.object.translateX(50);

scene.add(drill.object);
