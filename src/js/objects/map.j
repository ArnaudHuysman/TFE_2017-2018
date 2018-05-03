// //-------------------------- Board Game -----------------------------//
//
//
//
// class BoardGame {
//   constructor(){
//     this.mesh = new THREE.Object3D();
//     this.tileSize = 24;
//     var geom = new THREE.BoxBufferGeometry(this.tileSize,this.tileSize,this.tileSize);
//
//     var tampon= 0;
//     var tampon2 =0;
//
//     for(var i=0; i<20; i++){
//       if(i<10) tampon +=1;
//       else tampon -= 1;
//       for( var j=0; j<20; j++){
//         if(j<10) tampon2 +=1;
//         else tampon2 -= 1;
//         for (var k = 0; k < ((tampon)*(tampon2)*1.2)/(Math.random()*20); k++) {
//
//           var c = new THREE.Mesh(geom,new THREE.MeshPhongMaterial( { color: 0x5f5f5f, flatShading: true }));
//           c.position.x = i*(this.tileSize*1.05);
//           c.position.y = j*(this.tileSize*1.05);
//           c.position.z = -k*(this.tileSize*1.05);
//
//           c.castShadow = true;
//           c.receiveShadow = true;
//
//
//           this.mesh.add(c);
//
//           if(k === 0) {
//             mapTiles.push(c);
//           };
//
//         }
//       }
//     }
//   }
//
// }
//
//
//
// var board, mapTiles = [];
//
// function createBoardGame(){
//   board = new BoardGame(Colors.blue);
//
//
//
//   //board.mesh.rotation.y = Math.PI/4;
//   /*board.mesh.translateX(-16*(board.tileSize*1.05));*/
//   board.mesh.translateY(-10*(board.tileSize*1.05));
//   board.mesh.rotation.z = Math.PI / 4;
//   board.mesh.position.z = -10;
//   board.mesh.updateMatrixWorld();
//
//   scene.add(board.mesh);
// }
