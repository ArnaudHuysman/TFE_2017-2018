import GameBetweenWavesState from '../Game_States/gameBetweenWaves_state';
import GameLostState from '../Game_States/gameLost_state';
import GameEndedState from '../Game_States/gameEnded_state';

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;

export class  Wave {
  constructor(wave, game, oldWave, callback){

    this.callback = callback;
    this.wave = wave;
    this.time = this.wave.time*1000;
    this.timePassed = 0;
    this.nextEnemies = 600;
    this.delay = this.time / 12;



    this.isDone = false;

    this.enemies = this.wave.enemies;
    this.enemiesLeft = 0;
    if(oldWave) this.enemiesLeft += oldWave.enemiesLeft;
    this.allEnemiesPop = false;
  }

  update(game,dt){

    const {drill} = game.map;
    let self = this;
    this.timePassed += dt;

    if(this.timePassed > this.nextEnemies ){
      this.popEnemies(game);
      this.nextEnemies += this.delay;
    }

    if(this.timePassed > this.time || (this.allEnemiesPop && this.enemiesLeft == 0)){
      this.isDone = true;
      TweenMax.to(drill.drill_cstr.object.position, 0.5, {
        delay : 1,
        z : drill.drill_cstr.object.position.z - drill.diff ,
        ease: Power4.easeIn,
        onComplete : self.callback.bind(self)
      })
    }

  }

  popEnemies(game){
    this.allEnemiesPop = true;
    for (var i = 0; i < this.wave.enemies.length; i++) {
      switch (i) {
        case 0:
          for (var j = 0; j < 5; j++) {
            if(this.enemies[i].amount > 0){
              game.enemyFactory.addEntity(this.wave.enemies[i],game);
              this.enemies[i].amount--;
            }

          }
          break;
        case 1:
          for (var j = 0; j < 1; j++) {
            if(this.enemies[i].amount > 0){
              game.enemyFactory.addEntity(this.wave.enemies[i],game);
              this.enemies[i].amount--;
            }
          }
          break;
        case 2:
          for (var j = 0; j < 2; j++) {
            if(this.enemies[i].amount > 0){
              game.enemyFactory.addEntity(this.wave.enemies[i],game);
              this.enemies[i].amount--;
            }
          }
          break;
        default:

      }
      if(this.wave.enemies[i].amount > 0 ) this.allEnemiesPop = false;
    }
  }
}

export default class Waves_System {
  constructor(waves, game){
    this.game = game;
    this.waves = waves;
    this.count = 0;
    this.currentWave = null;
    this.hasBegun = false;
    this.isFinished = false;
  }

  update(dt){

    if(this.hasBegun){
      if(this.currentWave && !this.currentWave.isDone) this.currentWave.update(this.game,dt);
    }

  }

  changeWave(){

    if(this.count < this.waves.length){
      this.currentWave = new Wave(this.waves[this.count], this.game, this.currentWave, this.changeWave.bind(this));
      this.count++;
    } else {
      this.endWaves();
    }

    if(!this.isFinished) this.game.stateMachine.changeState(new GameBetweenWavesState(this.game,this.currentWave))
    else this.game.stateMachine.changeState(new GameEndedState(this.game, "victory"));

  }

  startWaves(){
    this.hasBegun = true;
  }

  endWaves(){
    console.log("Game Finish");
    this.isFinished = true;
  }
}
