import Enemy from '../enemy_cstr';
import {getPath, getCubePosition, getRandomTiles} from '../../Utils/path_functions';


export default class BigEnemy extends Enemy {
  constructor(width, height, depth, color, outcolor, name, game){
    super(width, height, depth, color, outcolor, name, game);

    this.mvtInterval = 0;
    this.mvtDelay = 10000;

    this.popDelay = 10000;
    this.popInterval = this.popDelay;

    this.matrix = game.map.matrix.map( (row,i) => row.map( (x,j) => {
      if( x !== 0) return 1;
      else if ( i < 5 || i > 15 || j < 5 || j > 15) return 0;
      else return 1;
    }));

    this.lifes = 5;


  }

  update(tp){

    const {hero, map} = this.currentGame;

    if( this.mvtInterval < tp){
      this.target = getRandomTiles(this.currentGame, map.spawTiles);
      this.mvtInterval = tp+this.mvtDelay;
    }

    if( this.popInterval < tp){
      this.spawnSimple();
      this.popInterval = tp+this.popDelay;
    }

    super.update();


    this.path = getPath(this.matrix, false, this.tilePos, this.target.arrayPos );

    this.targetPosition = this.path[1] ? getCubePosition(map, this.path[1]) : getCubePosition(map, this.path[0]) ;

    let diffX = this.targetPosition.x - this.body.object.position.x;
    let diffY = this.targetPosition.y - this.body.object.position.y;

    let theta = Math.atan2(diffY, diffX);

    if(this.mvt) this.move(theta);
  }

  move(theta){
    var mvtX = Math.cos(theta);
    var mvtY = Math.sin(theta);

    this.body.object.position.x += mvtX*0.3;
    this.body.object.position.y += mvtY*0.3;
  }

  animation(){
    TweenMax.to(this.body.object.position, 0.6,
    {
        z:22,
        ease: Power3.easeOut,
        repeat: -1,
        yoyo:true,
    });

    TweenMax.fromTo(this.body.object.scale, 0.6,
    {
        z: 1.6,
        y: 2.1,
        x: 2.1,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    },
    {
        z: 2.1,
        y: 1.9,
        x: 1.9,
        ease: Power2.easeOut,
        repeat: -1,
        yoyo:true,
    });

  }
  hitAction(hitableObjects){
    if(hitableObjects instanceof Bullet ) this.currentGame.enemyFactory.removeSelf(this);
  }

  spawnSimple(){

    for (var i = 0; i <= 360; i+=120 ) {

      let pos = {x: 0,y: 0,z: 0};

      pos.x = this.body.object.position.x + Math.cos(i)*25;
      pos.y = this.body.object.position.y + Math.sin(i)*25;
      pos.z = 10;

      this.currentGame.enemyFactory.addEntity("simple",this.currentGame, pos);

    }
  }
}
