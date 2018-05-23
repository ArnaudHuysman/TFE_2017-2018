import {keys}  from './utils';
import { ArmStandAnimation, ArmShootAnimation, LegStandAnimation } from '../Heroes/animations'

export function checkPressedKeys(hero){

  if(keys[90]) hero.char.object.position.y += 1;
  if(keys[83]) hero.char.object.position.y -= 1;
  if(keys[68]) hero.char.object.position.x += 1;
  if(keys[81]) hero.char.object.position.x -= 1;

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
