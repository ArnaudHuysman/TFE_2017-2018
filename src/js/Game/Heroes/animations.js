class WalkAnimation extends Animation {
  constructor(object){
    super(object)

    this.tweens = [];
  }

  in(){
    console.log("Walk In")
    // Arm Animation

    this.object.rightArm.object.rotation.x = -1;
    this.object.leftArm.object.rotation.x = 1;

    this.tweens.push(TweenMax.to(this.object.rightArm.object.rotation, 0.4, {
                    x : 1,
                    ease: Power0.easeInOut,
                    repeat : -1,
                    yoyo: true
                  }))

    this.tweens.push(TweenMax.to(this.object.leftArm.object.rotation, 0.4, {
                     x : -1,
                     ease: Power0.easeInOut,
                     repeat : -1,
                     yoyo: true
                  }))

    // Leg Animation

    this.object.rightLeg.object.rotation.x = 0.8;
    this.object.leftLeg.object.rotation.x = -0.8;

    this.tweens.push(TweenMax.to(this.object.leftLeg.object.rotation, 0.4, {
                    x : 0.8,
                    ease: Power0.easeInOut,
                    repeat : -1,
                    yoyo: true
                  }))

    this.tweens.push(TweenMax.to(this.object.rightLeg.object.rotation, 0.4, {
                    x : -0.8,
                    ease: Power0.easeInOut,
                    repeat : -1,
                    yoyo: true
                  }))
  }

  out(){
    console.log("Walk Out")
    this.tweens.forEach((tween) => {
      tween.kill();
    })

    this.tweens = [];

  }


}

class StandAnimation extends Animation{
  constructor(object){
    super(object)

  }

  in(){

    console.log("Stand In")
    this.object.movable.forEach((part) => {
      part.object.rotation.x = 0;
    })

  }

  out(){
    console.log("Stand Out")
  }
}

class ShootAnimation extends Animation {
  constructor(object){
    super(object)
  }
}

class DeadAnimation extends Animation{
  constructor(object){
    super(object)
  }
}
