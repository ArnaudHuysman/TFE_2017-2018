import {Animation} from '../../../animations/animationSystem';
import gsap from 'gsap';
var TweenMax = gsap.TweenMax;

export class ShooterWalkAnimation extends Animation {
  constructor(object){
    super(object)
  }

  in(){

    this.tweens.push(TweenMax.to(this.object.position, 0.4,
                  {
                      z:20,
                      ease: Power2.easeOut,
                      repeat: -1,
                      yoyo:true,
                  }))

    this.tweens.push(TweenMax.to(this.object.scale, 0.4,
                  {
                      z: 2.5,
                      y: 1.6,
                      x: 1.6,
                      ease: Power2.easeOut,
                      repeat: -1,
                      yoyo:true,
                  }))

    this.tweens.push(TweenMax.fromTo(this.object.rotation, 0.4,
                  {
                      x: 0.1,
                      ease: Power2.easeOut,
                      repeat: -1,
                      yoyo:true,
                  },
                  {
                      x: -0.1,
                      ease: Power2.easeOut,
                      repeat: -1,
                      yoyo:true,
                  }))
	}

	out(){
	  super.out()
	}
}

export class ShooterShootAnimation extends Animation {
  constructor(object, enemi, callback){
    super(object)
    this.callback = callback;
    this.enemi = enemi;
  }

  in(){
    var self = this;
    this.tweens.push(TweenMax.to(this.object.position, 0.8,
                  {
                      z:8,
                      ease: Power2.easeOut,
                      repeat: -1,
                      yoyo:true
                  }))

    this.tweens.push(TweenMax.to(this.object.scale, 0.8,
                  {
                      z: 1.6,
                      y: 2.2,
                      x: 2.2,
                      ease: Power2.easeOut,
                      repeat: -1,
                      yoyo:true,
                      onRepeat : self.callback.bind(self)
                  }))
	}

	out(){
	  super.out()
	}
}
