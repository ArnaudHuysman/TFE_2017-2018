import {Animation} from '../../../animations/animationSystem';

import gsap from 'gsap';
var TweenMax = gsap.TweenMax;

export class SimpleWalkAnimation extends Animation {
  constructor(object, app){
    super(object)

    this.app = app;
  }

  in(){

    let self = this;
    this.tweens.push(TweenMax.to(this.object.position, 0.4,
                              {
                                  z:16,
                                  ease: Power2.easeOut,
                                  repeat: -1,
                                  yoyo:true,
                              }))

    this.tweens.push(TweenMax.to(this.object.scale, 0.4,
                  {
                      z: 2.1,
                      y: 1.9,
                      x: 1.9,
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

export class SimpleDeathAnimation extends Animation {
  constructor(object, enemi){
    super(object)
    this.enemi = enemi;
  }

  in(){
    var self = this;
    this.tweens.push(TweenMax.to(this.object.scale, 0.8,
                  {
                    x:4,
                    y:4,
                    z:4,
                    ease: Power4.easeIn,
                    onComplete: function(){
                      let pos = self.enemi.game.context.camera.position;

                      self.enemi.game.context.camera.position.x -= 4;

                      TweenMax.to(self.enemi.game.context.camera.position, 0.05, {
                          x : pos.x+4,
                          ease: Power2.easeOut,
                          repeat: 5,
                          yoyo: true,
                          onComplete : function() { self.enemi.game.context.camera.position.x = pos.x}
                      })

                      self.enemi.game.enemyFactory.removeSelf(self.enemi.game,self.enemi)
                    }
                  }))
	}

	out(){
	  super.out()
	}
}
