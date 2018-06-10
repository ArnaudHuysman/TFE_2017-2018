

let count = 0;

export function initWaves(game){
  game.screenInfo.totalWaves = game.map.info.waves.length;
}

export function updateWaves(game,scene,timePassed){

  const map = game.map.info;

  console.log(timePassed)

  const time = timePassed/100;

  if( map.waves[count] && map.waves[count].time < time){

    for (var i = 0; i < map.waves[count].enemies.length; i++) {
      for (var j = 0; j < map.waves[count].enemies[i].amount; j++) {
        game.enemyFactory.addEntity(map.waves[count].enemies[i].type,game);
      }
    }
    count++;
    game.screenInfo.waves ++;
  }
}
