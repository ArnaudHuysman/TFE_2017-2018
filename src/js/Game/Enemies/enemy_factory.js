var  scoreDiv ;
var scoreText;
function removeSelf(obj){

  scoreDiv = document.querySelector(".score");

  Player.score++;
  scoreText = "Score : " + Player.score;
  scoreDiv.innerText = scoreText;

  scene.remove(obj.object);

  let index = GameObjects.enemies.indexOf(obj);
  if (index >= 0)
  {
    GameObjects.enemies.splice(index,1);
  }
  game.enemiesCollision.removeBody(obj);

  obj.collision = false;
  obj.objectInColllision = null;
}


function EnemiFactory(type) {
    var enemi ;

    switch(type) {
      case "simple" :
          enemi = new SimpleEnemy(4,4,4,0x8ac926, "blobl");
          break;

      case "big":
          enemi = new BigEnemy(8,8,8,0x4c6e15, "bigBlobl");
          break;

      case "shooting":
          enemi = new ShootingEnemy(4,4,10,0x56445d, "shootingBlobl");
          break;
    }


    //Move vertices
    /*for (var i = 0; i < 9; i++) {
      enemi.geom.vertices[i].z = 5;
    }
  */
    enemi.animation();
    return enemi;
}

function enemiesSpawn(type,pos) {
    var enemi = EnemiFactory(type);

    var rdm = Math.floor(Math.random() * mapTiles.length);
    if(!pos){
      var vector = new THREE.Vector3();
      vector.setFromMatrixPosition( mapTiles[rdm].matrixWorld );
      enemi.object.position.z = 10;
      enemi.object.position.x = vector.x;
      enemi.object.position.y = vector.y;
    } else {
      enemi.object.position.set(pos.x,pos.y,pos.z);
    }

    enemi.object.scale.set(2,2,2);

    console.log(enemi.object.position);
    GameObjects.enemies.push(enemi);
    game.enemiesCollision.addBody(enemi);
    scene.add(enemi.object);
}
