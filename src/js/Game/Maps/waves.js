
import {maps} from './maps';
import {GameObjects} from '../utils';

let count = 0;
export function updateWaves(game,scene,timePassed){

  const map = maps.firstMap;

  const time = timePassed/100;

  if( map.waves[count] && map.waves[count].time < time){
    console.log('waves');
    for (var i = 0; i < map.waves[count].enemies.length; i++) {
      for (var j = 0; j < map.waves[count].enemies[i].amount; j++) {
        let enemi = game.enemyFactory.addEntity(map.waves[count].enemies[i].type,game);
        GameObjects.enemies.push(enemi);
        game.enemiesCollision.addBody(enemi);
        game.threeContainer.add(enemi.object);
      }
    }
    count++;
  }


}
