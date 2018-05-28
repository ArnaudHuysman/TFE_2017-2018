
import SimpleEnemy from './Simple/simple_cstr';
import BigEnemy from './Big/big_cstr';
import ShooterEnemy from './Shooter/shooter_cstr';
import {GameObjects} from '../Utils/utils';

export default function EnemyFactory(game,scene){
  this.addEntity = function(type,game,pos){
    var enemi = this.getEnemyCstr(type,game);

    var rdm = Math.floor(Math.random() * game.map.mapTiles.length);
    if(!pos){
      var vector = new THREE.Vector3();
      vector.setFromMatrixPosition( game.map.mapTiles[rdm].matrixWorld );
      enemi.body.object.position.z = 10;
      enemi.body.object.position.x = vector.x;
      enemi.body.object.position.y = vector.y;
    } else {
      enemi.body.object.position.set(pos.x,pos.y,pos.z);
    }

    enemi.body.object.scale.set(2,2,2);

    game.enemies.push(enemi);
    game.collisionEngine.addBody(enemi.body,"enemies");
    scene.add(enemi.body.object);

  };

  this.getEnemyCstr = function (type,game){
    let enemi ;

    switch(type) {
      case "simple" :
          enemi = new SimpleEnemy(4,4,4,0x154E95, 0x16D4F0, "blobl", game);
          enemi.target = game.drill;
          break;

      case "big":
          enemi = new BigEnemy(8,8,8,0x0D5762, 0x16D4F0, "bigBlobl", game);
          break;

      case "shooting":
          enemi = new ShooterEnemy(4,4,10,0x511180, 0x16D4F0, "shootingBlobl", game);
          break;
    }

    enemi.animation();
    return enemi;
  };


  this.removeSelf = function(obj){

    scene.remove(obj.body.object);

    let index = GameObjects.enemies.indexOf(obj);
    if (index >= 0)
    {
      GameObjects.enemies.splice(index,1);
    }
    game.enemiesCollision.removeBody(obj);

    obj.collision = false;
    obj.objectInColllision = null;
  };
}
