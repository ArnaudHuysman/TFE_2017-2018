
import SimpleEnemy from './Simple/simple_cstr';
import BigEnemy from './Big/big_cstr';
import ShooterEnemy from './Shooter/shooter_cstr';
import {GameObjects} from '../utils';

export default function EnemyFactory(game,scene){
  this.addEntity = function(type,game,pos){
    var enemi = this.getEnemyCstr(type,game);

    var rdm = Math.floor(Math.random() * game.map.mapTiles.length);
    if(!pos){
      var vector = new THREE.Vector3();
      vector.setFromMatrixPosition( game.map.mapTiles[rdm].matrixWorld );
      enemi.object.position.z = 10;
      enemi.object.position.x = vector.x;
      enemi.object.position.y = vector.y;
    } else {
      enemi.object.position.set(pos.x,pos.y,pos.z);
    }

    enemi.object.scale.set(2,2,2);

    return enemi;
  };

  this.getEnemyCstr = function (type,game){
    let enemi ;

    switch(type) {
      case "simple" :
          enemi = new SimpleEnemy(4,4,4,0x8ac926, "blobl",game);
          enemi.target = game.drill;
          break;

      case "big":
          enemi = new BigEnemy(8,8,8,0x4c6e15, "bigBlobl",game);
          break;

      case "shooting":
          enemi = new ShooterEnemy(4,4,10,0x56445d, "shootingBlobl",game);
          break;
    }

    enemi.animation();
    return enemi;
  };


  this.removeSelf = function(obj){

    scene.remove(obj.object);

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
