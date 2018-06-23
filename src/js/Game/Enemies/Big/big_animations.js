import {Animation} from '../../../animations/animationSystem';

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;

export class BigWalkAnimation extends Animation {
  constructor(object, app){
    super(object)

    this.app = app;
  }

  in(){

    let self = this;
    console.log(this.object);
    this.tweens.push(TweenMax.to(this.object.position, 0.6,
                    {
                        z:22,
                        ease: Power3.easeOut,
                        repeat: -1,
                        yoyo:true,
                    }))

    this.tweens.push(TweenMax.fromTo(this.object.scale, 0.6,
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
                    }))
	}

	out(){
	  super.out()
	}
}

export class BigPopAnimation extends Animation {
  constructor(object, enemi, callback){
    super(object)
    this.enemi = enemi;
    this.callback = callback;
  }

  in(){
    var self = this;
    this.tweens.push(TweenMax.fromTo(this.object.scale, 1,
                    {
                        z: 1.6,
                        y: 2.4,
                        x: 2.4,
                        ease: Power4.easeOut
                    },
                    {
                        z: 2.6,
                        y: 1.6,
                        x: 1.6,
                        ease: Power4.easeIn,
                        onComplete: self.callback.bind(self)

                    }))
	}

	out(){
	  super.out()
	}
}
