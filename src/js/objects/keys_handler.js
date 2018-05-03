
function checkPressedKeys(){
  const hero = Heroes.standart;

  if(keys[90]) hero.char.mesh.position.y += 1;
  if(keys[83]) hero.char.mesh.position.y -= 1;
  if(keys[68]) hero.char.mesh.position.x += 1;
  if(keys[81]) hero.char.mesh.position.x -= 1;

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
