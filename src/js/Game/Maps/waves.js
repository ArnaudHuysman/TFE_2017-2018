let count = 0;

function updateWaves(timePassed){

  const map = maps.firstMap;

  const time = timePassed/100;


  if( map.waves[count] && map.waves[count].time < time){
    console.log(map.waves[count].enemies.length);
    for (var i = 0; i < map.waves[count].enemies.length; i++) {
      for (var j = 0; j < map.waves[count].enemies[i].amount; j++) {
        //enemiesSpawn(map.waves[count].enemies[i].type);
      }
    }
    count++;
  }


}
