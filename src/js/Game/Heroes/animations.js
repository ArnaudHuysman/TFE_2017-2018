import {Animation} from '../../animations/animationSystem'

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;

//Arms
export class ArmWalkAnimation extends Animation {
  constructor(object){
    super(object)
  }

  in(){
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
  }

  out(){
    super.out();
  }


}

export class ArmStandAnimation extends Animation{
  constructor(object){
    super(object)

  }

  in(){
    this.object.arms.forEach((part) => {
      this.tweens.push(TweenMax.to(part.object.rotation, 0.2, {
                    x : 0,
                    ease: Power0.easeInOut
                  }))
    })

  }

  out(){
    super.out();
  }
}

export class ArmShootAnimation extends Animation {
  constructor(object){
    super(object)
  }

  in(){
    this.object.arms.forEach((part) => {
      this.tweens.push(TweenMax.to(part.object.rotation, 0.05, {
                    x : -1.5,
                    ease: Power0.easeInOut
                  }))
    })

  }

  out(){
    super.out();
    this.object.arms.forEach((part) => {
      TweenMax.to(part.object.rotation, 0.1, {
                    x : 0,
                    ease: Power0.easeInOut
                  })
    })
  }
}

// LEGS

export class LegWalkAnimation extends Animation {
  constructor(object){
    super(object)
  }

  in(){

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
    super.out()
  }


}

export class LegStandAnimation extends Animation{
  constructor(object){
    super(object)

  }

  in(){

    this.object.legs.forEach((part) => {
      this.tweens.push(TweenMax.to(part.object.rotation, 0.2, {
                    x : 0,
                    ease: Power0.easeInOut
                  }))
    })

  }

  out(){
    super.out()
  }
}

//

export class DeadAnimation extends Animation{
  constructor(object){
    super(object)
  }
}
