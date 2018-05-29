

var PF = require('pathfinding');

const finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
});
export function getPath(matrix, diagonal, source, target, map){
  var grid = new PF.Grid(matrix);

  finder.allowDiagonal = diagonal;

  var path = finder.findPath(source[0],source[1],target[0],target[1], grid);

  showPath(map, path);
  return path;

}

export function getCubeMapValue(game,point){
  for (var i = 0; i < game.map.mapTiles.length; i++) {
    let tileBox = new THREE.Box3().setFromObject(game.map.mapTiles[i].mesh);

    if(tileBox.containsPoint(point)){
      return game.map.mapTiles[i];
    };
  }
}

export function getCubePosition(map,arrayPos){

  const result = map.mapTiles.filter(tile => tile.arrayPos[0] == arrayPos[0] && tile.arrayPos[1] == arrayPos[1]);
  let pos = result[0].mesh.getWorldPosition();
  return pos;
}

function showPath(map, path){

  for (var i = 0; i < map.mapTiles.length; i++) {
    map.mapTiles[i].mesh.material.color.setHex(0xfff);
  }

  for (var i = 0; i < path.length; i++) {
    let result = map.mapTiles.filter(tile => tile.arrayPos[0] == path[i][0] && tile.arrayPos[1] == path[i][1]);
    switch(i){
      case 0 :
        result[0].mesh.material.color.setHex( 0x4ECDC4 );
        break;
      case path.length-1 :
        result[0].mesh.material.color.setHex( 0xFF6B6B );
        break;
      default :
        result[0].mesh.material.color.setHex( 0xffffff );
        break;
    }
  }
}

export function getRandomTiles(game, tiles){
  var rdm = Math.floor(Math.random() * tiles.length);

  var vector = new THREE.Vector3();
  vector.setFromMatrixPosition( tiles[rdm].mesh.matrixWorld );

  return tiles[rdm];
}
