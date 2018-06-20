
import SimpleEnemy from './Simple/simple_cstr';
import BigEnemy from './Big/big_cstr';
import ShooterEnemy from './Shooter/shooter_cstr';
import {GameObjects} from '../Utils/utils';
import BulletFactory from './Shooter/bullet_factory'

export default function EnemyFactory(game,scene){

  this.entities = [];

  this.bulletFactory = new BulletFactory(game);

  this.addEntity = function(type,game,pos){
    var enemi = this.getEnemyCstr(type,game);

    var rdm = Math.floor(Math.random() * game.map.spawTiles.length);
    if(!pos){
      var vector = new THREE.Vector3();
      vector.setFromMatrixPosition( game.map.spawTiles[rdm].mesh.matrixWorld );
      enemi.body.object.position.z = 10;
      enemi.body.object.position.x = vector.x;
      enemi.body.object.position.y = vector.y;
    } else {
      enemi.body.object.position.set(pos.x,pos.y,pos.z);
    }

    enemi.body.object.scale.set(2,2,2);

    this.entities.push(enemi);
    game.wavesSystem.currentWave.enemiesLeft++;
    game.collisionEngine.addBody(enemi.body,"enemies");
    scene.add(enemi.body.object);

  };

  this.getEnemyCstr = function (type,game){
    let enemi ;

    switch(type) {
      case "simple" :
          enemi = new SimpleEnemy(5,5,5,0x154E95, 0x16D4F0, "blobl", game);
          enemi.target = game.drill;
          break;

      case "big":
          enemi = new BigEnemy(10,10,10,0x0D5762, 0x16D4F0, "bigBlobl", game);
          break;

      case "shooting":
          enemi = new ShooterEnemy(5,5,10,0x511180, 0x16D4F0, "shootingBlobl", game, this);
          break;
    }

    enemi.animation();
    return enemi;
  };


  this.removeSelf = function(game,obj){

    scene.remove(obj.body.object);

    game.collisionEngine.removeBody(obj.body, "enemies");
    game.wavesSystem.currentWave.enemiesLeft--;
    let index = this.entities.indexOf(obj);
		if (index >= 0)
		{
			this.entities.splice(index,1);
		}

  };

  this.update = function(mvtTime, game){
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update(mvtTime, game.context.scene);
    }

    this.bulletFactory.update(game.context.scene);
  }
}
