

var PF = require('pathfinding');
const finder = new PF.AStarFinder();
export function getPath(matrix, source, target){
  var grid = new PF.Grid(matrix);

  var path = finder.findPath(source[0],source[1],target[0],target[1], grid);

  return path;

}


export function getCubeMapValue(game,point){
  for (var i = 0; i < game.map.mapTiles.length; i++) {
    let tileBox = new THREE.Box3().setFromObject(game.map.mapTiles[i]);

    if(tileBox.containsPoint(point)){
      return game.map.mapTiles[i].arrayPos;
    };
  }
}

export function getCubePosition(map,arrayPos){

  const result = map.mapTiles.filter(tile => tile.arrayPos[0] == arrayPos[0] && tile.arrayPos[1] == arrayPos[1]);
  console.log(result);
  return result[0].position;
}




export function getRandomTiles(game){
  var rdm = Math.floor(Math.random() * game.map.mapTiles.length);

  var vector = new THREE.Vector3();
  vector.setFromMatrixPosition( game.map.mapTiles[rdm].matrixWorld );

  return vector;
}
