export class  Wave {
  constructor(wave, game, oldWave){

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
    this.timePassed += dt;

    if(this.timePassed > this.nextEnemies ){
      this.popEnemies(game);
      this.nextEnemies += this.delay;
    }

    if(this.timePassed > this.time || (this.allEnemiesPop && this.enemiesLeft == 0)){
      this.isDone = true;
    }

  }

  popEnemies(game){
    this.allEnemiesPop = true;
    for (var i = 0; i < this.wave.enemies.length; i++) {
      switch (i) {
        case 0:
          for (var j = 0; j < 5; j++) {
            if(this.enemies[i].amount > 0){
              game.enemyFactory.addEntity(this.wave.enemies[i].type,game);
              this.enemies[i].amount--;
            }

          }
          break;
        case 1:
          for (var j = 0; j < 1; j++) {
            if(this.enemies[i].amount > 0){
              game.enemyFactory.addEntity(this.wave.enemies[i].type,game);
              this.enemies[i].amount--;
            }
          }
          break;
        case 2:
          for (var j = 0; j < 2; j++) {
            if(this.enemies[i].amount > 0){
              game.enemyFactory.addEntity(this.wave.enemies[i].type,game);
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
      else this.changeWave();
    }

  }

  changeWave(){

    if(this.count < this.waves.length){
      console.log("wave ", this.count)
      this.currentWave = new Wave(this.waves[this.count], this.game, this.currentWave);
      this.count++;
    } else {
      this.endWaves();
    }

  }

  startWaves(){
    this.hasBegun = true;
  }

  endWaves(){
    console.log("Game Finish");
    this.isFinished = true;
  }
}
