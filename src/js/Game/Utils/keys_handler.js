import {keys}  from './utils';
import { ArmStandAnimation, ArmShootAnimation, LegStandAnimation } from '../Heroes/animations'

export function checkPressedKeys(hero){

  if(keys[90]) hero.char.object.position.y += 1.5;
  if(keys[83]) hero.char.object.position.y -= 1.5;
  if(keys[68]) hero.char.object.position.x += 1.5;
  if(keys[81]) hero.char.object.position.x -= 1.5;

  if( keys[90] || keys[83] || keys[68] || keys[81]){
    hero.char.body.mvt = true;

  } else {
    hero.char.body.mvt = false;
    hero.alreadyMoved = false;
    if(!(hero.armsAnimationSystem.currentAnimation instanceof ArmShootAnimation)) {
      hero.armsAnimationSystem.changeAnimation(new ArmStandAnimation(hero.char.body));
    }
    hero.legsAnimationSystem.changeAnimation(new LegStandAnimation(hero.char.body));
  }

}


export const Key = {
  _pressed: {},

  LEFT: 81,
  UP: 90,
  RIGHT: 68,
  DOWN: 83,

  isDown: function(keyCode) {
    return this._pressed[keyCode]
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
}
