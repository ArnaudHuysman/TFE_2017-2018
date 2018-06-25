
import SimpleEnemy from './Simple/simple_cstr';
import BigEnemy from './Big/big_cstr';
import ShooterEnemy from './Shooter/shooter_cstr';
import {GameObjects} from '../Utils/utils';
import BulletFactory from './Shooter/bullet_factory'

export default function EnemyFactory(game,scene){

  this.entities = [];

  this.bulletFactory = new BulletFactory(game);

  this.addEntity = function(entity,game,pos, posSec){
    var enemi = this.getEnemyCstr(entity,game);

    var rdm = Math.floor(Math.random() * game.map.spawTiles.length);
    if(!pos){
      var vector = new THREE.Vector3();
      vector.setFromMatrixPosition( game.map.spawTiles[rdm].mesh.matrixWorld );
      enemi.body.object.position.z = 600;
      enemi.body.object.position.x = vector.x;
      enemi.body.object.position.y = vector.y;
    } else {
      enemi.body.object.position.set(pos.x,pos.y,pos.z);
      enemi.posSecours = posSec;
    }

    enemi.body.object.scale.set(2,2,2);

    this.entities.push(enemi);
    game.wavesSystem.currentWave.enemiesLeft++;
    game.collisionEngine.addBody(enemi.body,"enemies");
    scene.add(enemi.body.object);

  };

  this.getEnemyCstr = function (entity,game){
    let enemi ;

    switch(entity.type) {
      case "simple" :
          enemi = new SimpleEnemy(6,6,6,0x1A8FE3, 0x16D4F0, "blobl", game, entity.lifes, entity.speed);
          enemi.target = game.drill;
          break;

      case "big":
          enemi = new BigEnemy(12,12,12,0x1E3888, 0x16D4F0, "bigBlobl", game, entity.lifes, entity.speed);
          break;

      case "shooting":
          enemi = new ShooterEnemy(5,5,10,0x9216FF, 0x16D4F0, "shootingBlobl", game, entity.lifes, entity.speed, this);
          break;
    }

    enemi.animation();
    return enemi;
  };


  this.removeSelf = function(game,obj){


    window.clearInterval(obj.stateMachine.currentState.interval);
    scene.remove(obj.body.object);
    scene.remove(obj.lifebar.mesh);

    game.collisionEngine.removeBody(obj.body, "enemies");
    game.wavesSystem.currentWave.enemiesLeft--;
    let index = this.entities.indexOf(obj);
		if (index >= 0)
		{
			this.entities.splice(index,1);
		}

  };

  this.update = function(mvtTime, game, dt){
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update(mvtTime, game.context.scene);
    }

    this.bulletFactory.update(game.context.scene, dt);
  }
}
