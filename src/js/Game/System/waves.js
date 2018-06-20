

let count = 0;

export function initWaves(game){
  game.screenInfo.totalWaves = game.map.info.waves.length;
}

export function updateWaves(game,scene,timePassed,dt){

  const map = game.map.info;
  const time = timePassed/100;

  if( map.waves[count] && map.waves[count].time < time){

    
    count++;
    game.screenInfo.waves++;
  }
}
