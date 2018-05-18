

var PF = require('pathfinding');
const finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  });
export function getPath(map, source, target){
  var grid = new PF.Grid(map.matrix);

  var path = finder.findPath(source[0],source[1],target[0],target[1], grid);

  showPath(map, path);
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
  let pos = result[0].getWorldPosition();
  return pos;
}

function showPath(map, path){

  for (var i = 0; i < map.mapTiles.length; i++) {
    map.mapTiles[i].material.color.setHex(0x292F36);
  }
  
  for (var i = 0; i < path.length; i++) {
    let result = map.mapTiles.filter(tile => tile.arrayPos[0] == path[i][0] && tile.arrayPos[1] == path[i][1]);
    switch(i){
      case 0 :
        result[0].material.color.setHex( 0x4ECDC4 );
        break;
      case path.length-1 :
        result[0].material.color.setHex( 0xFF6B6B );
        break;
      default :
        result[0].material.color.setHex( 0xffffff );
        break;
    }


  }
}




export function getRandomTiles(game){
  var rdm = Math.floor(Math.random() * game.map.mapTiles.length);

  var vector = new THREE.Vector3();
  vector.setFromMatrixPosition( game.map.mapTiles[rdm].matrixWorld );

  return vector;
}
