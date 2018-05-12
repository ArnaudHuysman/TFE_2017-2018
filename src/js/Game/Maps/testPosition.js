export function getCubePosition(point){
  for (var i = 0; i < mapTiles.length; i++) {
    console.log(mapTiles[i])
  }
}

export function getRandomTiles(game){
  var rdm = Math.floor(Math.random() * game.map.mapTiles.length);

  var vector = new THREE.Vector3();
  vector.setFromMatrixPosition( game.map.mapTiles[rdm].matrixWorld );

  return vector;
}
